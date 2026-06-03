#!/usr/bin/env bash
# Hercompileer de Tailwind-CSS na wijzigingen aan klassen in HTML/JS.
# Draai vanuit de map 03_Website:  bash _build/build.sh
set -e
cd "$(dirname "$0")"
npx -y tailwindcss@3.4.17 -c tailwind.home.cjs -i tailwind.input.css -o ../assets/tw-home.css --minify
npx -y tailwindcss@3.4.17 -c tailwind.gen.cjs  -i tailwind.input.css -o ../assets/tw.css --minify
echo "Klaar: assets/tw-home.css (index) + assets/tw.css (overige)"
