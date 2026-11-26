# MONA · 画中来信

An independent art and AI study built around Leonardo da Vinci’s Mona Lisa.

## Online exhibition

This GitHub Pages build provides the gallery interface, historically grounded **preset** text tours, and a **pre-rendered** MuseTalk talking portrait clip. It does not run a live language model, speech recognition, or per-reply video generation. Unsupported functions are clearly identified in the interface.

The full local prototype uses Ollama, faster-whisper, neural speech and MuseTalk on Apple Metal.

## Run this published package locally

Serve this directory with any static HTTP server. All assets use relative paths, including when hosted under a GitHub Pages project subdirectory. No npm dependencies or build step are required.

## Credits

- Historical reference: [Louvre collection record](https://collections.louvre.fr/en/ark:/53355/cl010062370).
- Painting: Leonardo da Vinci; digital image from C2RMF, [Wikimedia Commons public-domain source](https://commons.wikimedia.org/wiki/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg).
- Lip-sync: [MuseTalk](https://github.com/TMElyralab/MuseTalk), [Apple Silicon port](https://github.com/barnent1/musetalk-mac).
- Recorded Chinese voice: Microsoft neural speech through [edge-tts](https://github.com/rany2/edge-tts).

This is an artistic reconstruction, not an official museum product or a claim about the sitter’s undocumented private thoughts. Artwork and third-party components retain their respective licenses.

Publish date: 2026-11-26.
