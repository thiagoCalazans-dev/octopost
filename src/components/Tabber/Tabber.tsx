﻿/* eslint-disable @typescript-eslint/no-unnecessary-condition -- to avoid lint error that will be remove soon on a changhe of how the data will be dealed */

import { ChangeEvent, ReactNode, useState } from 'react';

import { PostMode } from '~services/api/social-media/social-media.types';
import { useSocialMediaStore } from '~stores/useSocialMediaStore';

import { accountsToTabs } from './utils';

import scss from '~components/Tabber/Tabber.module.scss';

import PostModes from './PostModes/PostModes';
import Tabs from './Tabs/Tabs';

import { Tab, TabId, Tabs as TabsType } from './Tabber.types';

function Tabber(): ReactNode {
  const { accounts, socialMedias } = useSocialMediaStore();

  const [currentTab, setCurrentTab] = useState<TabId>(
    `${accounts[0].id}-${accounts[0].socialMediaId}`
  );

  const [tabs, setTabs] = useState<TabsType>(
    accountsToTabs(accounts, socialMedias)
  );

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const tab = { ...tabs[currentTab] };
    const postId = tab.postModeOnView;
    tab.posts[postId].text = e.target.value;

    setTabs({
      ...tabs,
      [currentTab]: tab,
    });
  };

  const changeCurrentTab = (tab: Tab): void => {
    setCurrentTab(tab.id);
  };

  const changePostMode = (postMode: PostMode): void => {
    const tab = { ...tabs[currentTab] };
    tab.postModeOnView = postMode.id;

    if (!tab.posts[postMode.id]) {
      tab.posts[postMode.id] = { text: '' };
    }

    setTabs({
      ...tabs,
      [currentTab]: tab,
    });
  };

  return (
    <div>
      <Tabs
        currentTab={tabs[currentTab]}
        onChangeTab={changeCurrentTab}
        tabs={tabs}
      />
      <div className={scss.gridContainer}>
        <div className={scss.postModesContainer}>
          <PostModes
            currentPostModeId={tabs[currentTab].postModeOnView}
            currentTab={tabs[currentTab].account}
            onChangePostMode={changePostMode}
          />
          <input
            onChange={handleContentChange}
            type="text"
            value={
              tabs[currentTab].posts[tabs[currentTab].postModeOnView].text ?? ''
            }
          />
        </div>
        <div className={scss.previewContainer}>
          {tabs[currentTab].posts[tabs[currentTab].postModeOnView].text}
        </div>
      </div>
    </div>
  );
}

export default Tabber;
