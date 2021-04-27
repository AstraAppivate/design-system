---
title: Progress Indicator
description: An animated indication that some form of network request or processing pending.
header: true
---

import ProgressIndicatorComponent from '../../images/components/progress-indicator/Component'
import ProgressIndicatorAnatomy from '../../images/components/progress-indicator/Anatomy'

import Bucket from '../../../components/presenters/bucket'

<div className="bucket__container">
  <Bucket type="sketch" url="https://docs.royalnavy.io/design-system.sketch" />
  <Bucket type="storybook" url="https://storybook.royalnavy.io/?path=/docs/progress-indicator--default" />
</div>

# Overview

The Progress Indicator provides visual feedback to the user that an application is currently processing or retrieving data. Its purpose is to show that the application has not stalled - rather it is still running, however cannot update the UI with the newly requested or processed data.

<ProgressIndicatorComponent />

## Usage

The Progress Indicator should be used when processing or retrieving data. It should be used to convey a delay in the loading of data, indicating a network request may be taking longer than usual to complete.

### Accessibility

Where a widget of content is in a loading state the `aria-busy` attribute should be applied. This attribute indicates an element is being modified.

The default value of `aria-busy` is false for all elements. When `aria-busy` is true for an element, assistive technologies may ignore changes to content owned by that element and then process all changes made during the busy period as a single, atomic update when aria-busy becomes false.

### Anatomy

<ProgressIndicatorAnatomy />

1. **Indicator Animation.** An SVG spinner that rotates to provide feedback to the user that the application is loading, rather than hung.
2. **Loading Label.** Accompanies the Indicator Animation to provide written context to the spinner.

### Hierarchy & Placement

The Progress Indicator can either be used as a full screen overlay, or within an individual component. Use the indicator full screen when the application is on first load. Individual components should have the progress indicator displayed when they are retrieving data, yet don't have anything to display yet.
