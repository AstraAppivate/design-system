---
title: Container
description: ''
tags: public
pageClass: ''
template: default
index: 2
---

import DataTable from '../../../components/presenters/data-table'
import CodeHighlighter from '../../../components/presenters/code-highlighter'

# Container

The container CSS class wraps all your main application content:

<CodeHighlighter 
source={`<div class="rn-container">
    // Main App Content
 </div>`} language="scss"
/>

## Available Sizing

The container class has 3 different variations. The default class has a padding of `0.75rem`. The Standards Toolkit also provides a small container with padding of `0.5rem`:

<CodeHighlighter 
source={`<div class="rn-container--large">
    // Large Container
 </div>`} language="scss"
/>

And a large container that has a padding of `1.25rem`:

<CodeHighlighter 
source={`<div class="rn-container--small">
    // Large Container
 </div>`} language="scss"
/>