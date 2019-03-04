---
title: Masthead
description: Mastheads serve as the main header and navigation for apps.
audience: public
pageClasses: ''
context: 'Component Library'
template: withsidebar
usageExampleType: javascript
usageExample: Import RnMasthead from '@NELSON/RnMasthead'
---

# Overview

Mastheads are fixed to the top of NELSON applications, providing home links and space to add global actions like search capability.

```html
  <div class="rn-masthead">
    <div className="rn-masthead__head">
      <h4 className="rn-masthead__title">Masthead Title</h4>
    </div>
  </div>
```

# Tabs

Tabs can optionally be added to Mastheads to serve as an application's main navigation.


```html
  <div class="rn-masthead">
    <div className="rn-masthead__head">
      <h4 className="rn-masthead__title">Masthead Title</h4>
    </div>
    <nav className="rn-masthead__nav">
      <a className="rn-masthead__link h_mr-1" href="">Nav Link</a>
      <a className="rn-masthead__link h_mr-1" href="">Nav Link</a>
      <a className="rn-masthead__link h_mr-1" href="">Nav Link</a>
    </nav>
  </div>
```