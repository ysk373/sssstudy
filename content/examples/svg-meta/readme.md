---
title: SVG Meta data
order: 4
---
This is a link to an SVG file
```md
![diag](./test-diag-link.svg)
```

when adding a meta data yaml file `test-diag-link.yaml` with this content
```yaml
links:
  - label: component
    link: https://en.wikipedia.org/wiki/Software_component
  - label: model
    link: https://en.wikipedia.org/wiki/Model
```

Will generate an SVG diagram with links

![diag](./test-diag-link.svg)

link to zoom text [singelton](/astro-big-doc/examples/svg-meta?modal=test-diag-link.svg&text=singleton)

# Highlight on hover

```blockdiag highlight-hover
blockdiag {
  Kroki -> is -> Awesome;
}
```
