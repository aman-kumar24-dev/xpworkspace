import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else if (div.querySelector('a')) div.className = 'cards-card-cta';
      else div.className = 'cards-card-body';
    });
    // the last plain-text div (before the CTA) is the image description
    const bodyDivs = [...li.children].filter((div) => div.className === 'cards-card-body');
    if (bodyDivs.length > 1) bodyDivs[bodyDivs.length - 1].className = 'img-decription';
    ul.append(li);
  });

  // replace images with optimized versions
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));

  block.replaceChildren(ul);
}
