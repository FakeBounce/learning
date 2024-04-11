import { getStoryContext, TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Check if the component imports the Iconify library
    const usesIconify = storyContext.parameters?.waitForSVG;

    // If the component uses Iconify, wait for the presence of an SVG
    if (usesIconify) {
      await page.waitForSelector('svg');
    }

    // the #storybook-root element wraps the story. In Storybook 6.x, the selector is #root
    const elementHandler = await page.$('#storybook-root');

    if (elementHandler) {
      const innerHTML = await elementHandler.innerHTML();
      expect(innerHTML).toMatchSnapshot();
      return;
    }
  }
};

export default config;
