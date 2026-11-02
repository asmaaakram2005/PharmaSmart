# PharmaSmart prototype

PharmaSmart is a smart-packaging information prototype. Each QR code should open one product-information page, not a shop or marketing page.

## Run locally

Open the folder in VS Code and use **Live Server** on `index.html`. Do not open the HTML file directly because the site loads `products.json` with JavaScript.

## Product QR destinations

After publishing the project, make one QR code for each full public link:

| Product | Link suffix |
| --- | --- |
| Hydrating Cream | `product.html?id=P001` |
| Acne Cleanser | `product.html?id=P002` |
| Retinol Serum | `product.html?id=P003` |

For example, if the published site address is `https://USERNAME.github.io/pharmasmart/`, the first QR code must contain:

`https://USERNAME.github.io/pharmasmart/product.html?id=P001`

## Adding video or audio

Put the media file in the project, then set its relative path in the matching item in `products.json`:

```json
"video": "videos/hydrating-cream.mp4",
"audio": "audio/hydrating-cream.mp3"
```

The page hides the media section until a path is provided.

## Feedback and questions

Feedback, star ratings, and questions are saved with browser local storage. They remain on the same device and browser only; they are not uploaded, published, or shared. This keeps the prototype fully local and removes the need for Firebase.

## Content reminder

The current product information is for a school prototype. Replace it with approved, verified package information before using the platform for any real cosmetic or medicine product.
