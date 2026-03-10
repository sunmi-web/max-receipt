import { print } from '@sunmi/max-print';
import template from './template.json';

test('run example', async () => {
    await print(template, template.data);
});
