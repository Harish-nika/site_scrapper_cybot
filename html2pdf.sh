#!/bin/bash

URL="https://www.factentry.com/"
OUTPUT="/home/harish/Project_works/pdf_printer_chromium/edgar_document.pdf"

google-chrome --headless --disable-gpu --no-sandbox \
  --print-to-pdf="$OUTPUT" "$URL"

echo "✅ PDF saved to: $OUTPUT"
