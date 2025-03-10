//
//  ContentView.swift
//  HalfPic
//
//  Created by Jaidon Lalor on 2/8/25.
//

import SwiftUI

struct ContentView: View {
    @State private var isProcessing = false
    @State private var isComplete = false
    @State private var selectedFolder: URL?

    var body: some View {
        VStack {
            if isComplete {
                Text("Successfully processed")
                    .font(.title)
                Text("Drag more")
                    .font(.subheadline)
                    .padding(.top, 4)
            } else {
                Text("Drop images here to half them")
                    .font(.title)
                    .multilineTextAlignment(.center)
            }
        }
        .frame(width: 400, height: 300)
        .onDrop(of: ["public.file-url"], isTargeted: nil) { providers in
            handleDrop(providers)
        }
    }

    private func handleDrop(_ providers: [NSItemProvider]) -> Bool {
        var fileURLs: [URL] = []

        for provider in providers {
            if provider.hasItemConformingToTypeIdentifier("public.file-url") {
                provider.loadItem(forTypeIdentifier: "public.file-url", options: nil) { (urlData, error) in
                    guard let urlData = urlData as? Data,
                          let urlString = String(data: urlData, encoding: .utf8),
                          let fileURL = URL(string: urlString) else { return }

                    DispatchQueue.main.async {
                        fileURLs.append(fileURL)

                        // When all files are collected, defer folder selection
                        if fileURLs.count == providers.count {
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                                promptForFolderAndProcessFiles(fileURLs)
                            }
                        }
                    }
                }
            }
        }

        // Immediately return true to end the drag operation smoothly
        return true
    }
    
    private func promptForFolderAndProcessFiles(_ fileURLs: [URL]) {
        // Open folder selection *after* drag event has completed
        let panel = NSOpenPanel()
        panel.canChooseFiles = false
        panel.canChooseDirectories = true
        panel.allowsMultipleSelection = false
        panel.prompt = "Select Folder"
        panel.message = "Choose where to save resized images"

        if panel.runModal() == .OK, let selectedFolder = panel.url {
            for fileURL in fileURLs {
                processImage(fileURL, destinationFolder: selectedFolder)
            }
        } else {
            print("❌ User canceled folder selection")
        }
    }

    private func processImage(_ fileURL: URL, destinationFolder: URL) {
        DispatchQueue.global(qos: .userInitiated).async {
            print("🖼️ Received image: \(fileURL.path)")

            guard let image = NSImage(contentsOf: fileURL) else {
                print("❌ Failed to load image from: \(fileURL.path)")
                return
            }

            guard let resizedImage = resizeImage(image) else {
                print("❌ Failed to resize image")
                return
            }

            // Create the "HalfPic" subfolder inside the selected destination folder
            let outputFolder = destinationFolder.appendingPathComponent("HalfPic")
            let outputFile = outputFolder.appendingPathComponent(fileURL.lastPathComponent)

            do {
                try FileManager.default.createDirectory(at: outputFolder, withIntermediateDirectories: true)
                saveImage(resizedImage, to: outputFile)
                print("✅ Image saved successfully at \(outputFile.path)")

                DispatchQueue.main.async {
                    isComplete = true
                }
            } catch {
                print("❌ Error creating folder: \(error.localizedDescription)")
            }
        }
    }

    private func resizeImage(_ image: NSImage) -> NSImage? {
        let newSize = NSSize(width: image.size.width / 2, height: image.size.height / 2)
        let newImage = NSImage(size: newSize)

        newImage.lockFocus()
        image.draw(
            in: NSRect(origin: .zero, size: newSize),
            from: NSRect(origin: .zero, size: image.size),
            operation: .copy,
            fraction: 1.0
        )
        newImage.unlockFocus()

        return newImage
    }

    private func saveImage(_ image: NSImage, to url: URL) {
        guard let tiffData = image.tiffRepresentation,
              let bitmap = NSBitmapImageRep(data: tiffData) else {
            print("❌ Failed to create bitmap representation")
            return
        }

        // Add PNG compression options
        let pngData = bitmap.representation(using: .png, properties: [.compressionFactor: 0.5])

        guard let data = pngData else {
            print("❌ Failed to generate PNG data")
            return
        }

        do {
            try data.write(to: url)
            print("✅ Image successfully saved to \(url.path)")
        } catch {
            print("❌ Error saving image: \(error.localizedDescription)")
        }
    }
}

#Preview {
    ContentView()
}
