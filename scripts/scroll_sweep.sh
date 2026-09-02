#!/bin/bash
# Sweep scroll positions and pixel-compare against the user's screenshot
cd /home/z/my-project
for y in 6150 6200 6250 6300 6350 6400 6402 6450 6480 6500 6543; do
  agent-browser eval "window.scrollTo(0, $y); 'y'" > /dev/null
  sleep 0.7
  agent-browser screenshot /home/z/my-project/scripts/sweep_$y.png > /dev/null
done
echo "sweep done"
