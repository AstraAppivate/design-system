import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import {
  IconHome,
  IconLocalShipping,
  IconVerifiedUser,
  IconMessage,
  IconFeedback,
  IconSettings,
  IconGrain,
} from '@royalnavy/icon-library'

import {
  SidebarE,
  SidebarEProps,
  SidebarNavE,
  SidebarNavItemE,
  SidebarUserE,
  SidebarWrapperE,
} from '.'
import { Link } from '../../Link'
import { Notification, Notifications } from '../NotificationPanel'

export default {
  component: SidebarE,
  subcomponents: {
    SidebarE,
    SidebarNavE,
    SidebarNavItemE,
    SidebarUserE,
    SidebarWrapperE,
    Notifications,
    Notification,
  },
  title: 'Sidebar (Experimental)',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        component:
          'This API is experimental and may change outside of the typical semver release cycle.',
      },
    },
  },
} as Meta

const userWithLinks = (
  <SidebarUserE
    initials="HN"
    name="Horatio Nelson"
    userLink={<Link href="#">Profile</Link>}
    exitLink={<Link href="#">Logout</Link>}
  />
)

const sidebarNav = (
  <SidebarNavE>
    <SidebarNavItemE
      icon={<IconHome />}
      link={<Link href="#">Dashboard</Link>}
    />
    <SidebarNavItemE
      icon={<IconVerifiedUser />}
      link={<Link href="#">Reports</Link>}
    />
    <SidebarNavItemE
      icon={<IconLocalShipping />}
      link={<Link href="#">Platforms</Link>}
    />
    <SidebarNavItemE
      icon={<IconFeedback />}
      link={<Link href="#">Data&nbsp;Feed</Link>}
    />
    <SidebarNavItemE
      isActive
      icon={<IconMessage />}
      link={<Link href="#">Messages</Link>}
    />
    <SidebarNavItemE
      icon={<IconSettings />}
      link={<Link href="#">Settings</Link>}
    />
  </SidebarNavE>
)

const sidebarNavWithSub = (
  <SidebarNavE>
    <SidebarNavItemE
      icon={<IconHome />}
      link={<Link href="#">Dashboard</Link>}
    />
    <SidebarNavItemE
      icon={<IconVerifiedUser />}
      link={<Link href="#">Reports</Link>}
    >
      <SidebarNavE>
        <SidebarNavItemE link={<Link href="#">Sub-nav-item 1</Link>} />
        <SidebarNavItemE link={<Link href="#">Sub-nav-item 2</Link>} />
        <SidebarNavItemE link={<Link href="#">Sub-nav-item 3</Link>} />
      </SidebarNavE>
    </SidebarNavItemE>
    <SidebarNavItemE
      icon={<IconLocalShipping />}
      link={<Link href="#">Platforms</Link>}
    />
    <SidebarNavItemE
      icon={<IconFeedback />}
      link={<Link href="#">Data&nbsp;Feed</Link>}
    >
      <SidebarNavE>
        <SidebarNavItemE link={<Link href="#">Sub-nav-item 1</Link>} />
        <SidebarNavItemE link={<Link href="#">Sub-nav-item 2</Link>} />
        <SidebarNavItemE link={<Link href="#">Sub-nav-item 3</Link>} />
      </SidebarNavE>
    </SidebarNavItemE>
    <SidebarNavItemE
      isActive
      icon={<IconMessage />}
      link={<Link href="#">Messages</Link>}
    >
      <SidebarNavE>
        <SidebarNavItemE link={<Link href="#">Sub-nav-item 1</Link>} />
        <SidebarNavItemE link={<Link href="#">Sub-nav-item 2</Link>} />
        <SidebarNavItemE isActive link={<Link href="#">Sub-nav-item 3</Link>} />
      </SidebarNavE>
    </SidebarNavItemE>
    <SidebarNavItemE
      icon={<IconSettings />}
      link={<Link href="#">Settings</Link>}
    />
  </SidebarNavE>
)

const notifications = (
  <Notifications link={<Link href="#" />}>
    <Notification
      link={<Link href="#" />}
      name="Thomas Stephens"
      action="added a new comment to your"
      on="review"
      when={new Date('2019-11-05T14:25:02.178Z')}
      description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores"
    />
    <Notification
      link={<Link href="#" />}
      name="Thomas Stephens"
      action="added a new comment to your"
      on="review"
      when={new Date('2019-11-01T14:25:02.178Z')}
      description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores"
    />
    <Notification
      link={<Link href="#" />}
      name="Thomas Stephens"
      action="added a new comment to your"
      on="review"
      when={new Date('2019-11-01T14:25:02.178Z')}
      description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores"
    />
  </Notifications>
)

export const Default: Story<SidebarEProps> = (props) => {
  return (
    <SidebarWrapperE>
      <div style={{ maxHeight: '20rem' }}>
        <SidebarE {...props}>{sidebarNav}</SidebarE>
      </div>
      <main>Hello, World!</main>
    </SidebarWrapperE>
  )
}

Default.args = {}

export const WithHeader: Story<SidebarEProps> = (props) => {
  return (
    <SidebarWrapperE>
      <div style={{ maxHeight: '20rem' }}>
        <SidebarE {...props} icon={<IconGrain />} title="Application Name">
          {sidebarNav}
        </SidebarE>
      </div>
      <main>Hello, World!</main>
    </SidebarWrapperE>
  )
}

WithHeader.storyName = 'With header'

export const WithUserMenu: Story<SidebarEProps> = (props) => {
  return (
    <SidebarWrapperE>
      <div style={{ maxHeight: '20rem' }}>
        <SidebarE
          {...props}
          icon={<IconGrain />}
          title="Application Name"
          user={userWithLinks}
        >
          {sidebarNav}
        </SidebarE>
      </div>
      <main>Hello, World!</main>
    </SidebarWrapperE>
  )
}

WithUserMenu.storyName = 'With user menu'

export const WithNotifications: Story<SidebarEProps> = (props) => {
  return (
    <SidebarWrapperE>
      <div style={{ maxHeight: '20rem' }}>
        <SidebarE
          {...props}
          icon={<IconGrain />}
          title="Application Name"
          user={userWithLinks}
          notifications={notifications}
          hasUnreadNotification
        >
          {sidebarNav}
        </SidebarE>
      </div>
      <main>Hello, World!</main>
    </SidebarWrapperE>
  )
}

WithNotifications.storyName = 'With notifications'

export const WithSubNavigation: Story<SidebarEProps> = (props) => {
  return (
    <SidebarWrapperE>
      <div style={{ maxHeight: '20rem' }}>
        <SidebarE
          {...props}
          icon={<IconGrain />}
          title="Application Name"
          user={userWithLinks}
          notifications={notifications}
          hasUnreadNotification
        >
          {sidebarNavWithSub}
        </SidebarE>
      </div>
      <main>Hello, World!</main>
    </SidebarWrapperE>
  )
}

WithSubNavigation.storyName = 'With sub-navigation'
