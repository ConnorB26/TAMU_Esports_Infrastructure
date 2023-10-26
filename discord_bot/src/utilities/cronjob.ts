import {CronJob} from 'cron';

export const cronJob = new CronJob('0 0 0 * * *', () => {
  // Do something
});