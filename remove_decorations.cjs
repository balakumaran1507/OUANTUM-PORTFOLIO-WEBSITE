const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/Raja/OneDrive/Desktop/NDT-ZYRA/src/components/home';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let newContent = content;

  // Remove module corners
  newContent = newContent.replace(/\s*<div className="module-corner[^"]*"[^>]*><\/div>/g, '');
  newContent = newContent.replace(/\s*<div className="module-corner[^"]*"[^>]*>\s*<\/div>/g, '');

  // Remove plus grid
  newContent = newContent.replace(/\s*<div className="plus-grid"[^>]*>[\s\S]*?<\/div>/g, '');

  // Remove crosshair
  newContent = newContent.replace(/\s*<div className="crosshair-center"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');

  // Remove status-pulse
  newContent = newContent.replace(/\s*<div className="status-pulse"[^>]*><\/div>/g, '');

  // Remove marker-dot
  newContent = newContent.replace(/\s*<div className="marker-dot"[^>]*><\/div>/g, '');

  if (content !== newContent) {
    fs.writeFileSync(path.join(dir, file), newContent);
    console.log('Updated ' + file);
  }
});
