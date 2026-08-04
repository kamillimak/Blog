import { UNIFIED_NEWS_FEED } from '../src/data/newsFeed';

console.log('UNIFIED_NEWS_FEED items count:', UNIFIED_NEWS_FEED.length);
UNIFIED_NEWS_FEED.forEach((item, index) => {
  console.log(`${index + 1}. [${item.publishedAt}] [${item.kind}] - ${item.title}`);
});
