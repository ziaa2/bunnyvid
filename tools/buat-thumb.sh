#!/usr/bin/env bash
# Membuat thumbnail webp kecil (480x300) dari video lokal.
# Pemakaian: ./tools/buat-thumb.sh video.mp4 nama-thumb [detik]
set -euo pipefail
[ $# -ge 2 ] || { echo "Pemakaian: $0 video.mp4 nama-thumb [detik]"; exit 1; }
mkdir -p thumbs
ffmpeg -y -ss "${3:-5}" -i "$1" -frames:v 1 \
  -vf "scale=480:300:force_original_aspect_ratio=increase,crop=480:300" \
  -c:v libwebp -quality 70 "thumbs/$2.webp"
echo "Jadi: thumbs/$2.webp (isi \"thumb\": \"thumbs/$2.webp\" di videos.json)"
