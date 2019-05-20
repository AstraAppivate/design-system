---
title: Badge
description: Badges are used for counts and labelling.
---

```html
  <span className="rn-badge">
    Badge
  </span>
```

# Overrides

## Faded

Faded badges draw less attention to themselves, whilst still displaying information to the user.

```html
  <span className="rn-badge--faded primary">
    Faded Badge
  </span>
```

## Pills

To visually change a badge into a pill, a class of `.pill` is added. Pills are great for counts and notification badges.

```html
  <span className="rn-badge--solid pill">
    Badge
  </span>
```

## Links

Adding the badge classes to an `<a>` tag will turn the badge into a clickable item.


```html
  <a href="" className="rn-badge--solid pill">
    Badge
  </a>
```


<!-- 
```html
  <rn-badge state="inverse">Badge</rn-badge>
```

#### Props

Prop Name    | Value                       | Required
------------ | --------------------------- | --------
**type**     | `pill`                      | false
**state**    | `inverse` `success` `error` | false
**size**     | `small` `large`             | false
-->