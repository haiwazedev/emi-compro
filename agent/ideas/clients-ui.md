# Description

Implement clients section UI for landing page

### Requirements

- UI divided into two section: `information` and `logos-marquee`
- `information` section contains:
  - section head label with `Our Network` label (capitalized)
  - section title with `Our Clients` label:
    - font-family: `Instrument Serif`
    - divided into two color with `Clients` label as italic
  - section description with small font
  - total clients badge with green dot
- `logos-marquee` is UI containing two marquee stacked in column:
  - marquee shows client logo pictures from assets in card-ui style
  - top marquee moving slide to left infinitely
  - bottom marquee moving slide to right infinitely
  - when card is hovered, stop the marquee and raised the card slightly with shadow animation and change background color
- There are tiny `and many more...` label on bottom right below the `logos-marquee`

### Notes

- UI design references can be found at agent/resources/clients-ui
- Client logo assets can be found at public/clients
