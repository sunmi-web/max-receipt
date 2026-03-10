import { print } from '@sunmi/max-print';

test('run example', async () => {
    const template = {
        name: {
            'zh-CN': '标签制作单',
            'en-US': 'Label Production Order',
        },
        schemaVersion: 1,
        version: '1.0.0',
        supported: [[60, 40]],
        defaultLang: 'zh-CN',
        list: [
            {
                type: 'columnInColumn',
                param: {
                    columns: [
                        {
                            type: 'text',
                            typeId: 'pickupNum',
                            param: {
                                size: 'm',
                                text: '{{pickupNum}}',
                                align: 0,
                                bold: 1,
                                weight: 1,
                            },
                            id: 'uSCv1',
                        },
                        {
                            type: 'text',
                            typeId: 'serviceType',
                            param: {
                                size: 'm',
                                text: '{{serviceType}} {{num}}/{{total}}',
                                bold: 0,
                                align: 2,
                                weight: 1,
                            },
                            id: 'jBdcO',
                        },
                    ],
                },
                id: 'JyMBD',
            },
            {
                type: 'text',
                typeId: 'serialNum',
                param: {
                    text: '{{serialNumTitle|l}}: {{serialId}}',
                    size: 'm',
                    bold: 0,
                    align: 0,
                },
                id: '6IGxu',
            },
            {
                type: 'text',
                typeId: 'orderFrom',
                param: {
                    size: 's',
                    text: '{{orderFromTitle|l}}: {{orderFrom}}',
                    align: 0,
                    bold: 0,
                },
                id: '8OvYC',
            },
            {
                type: 'divider',
                param: { style: 2, height: 3 },
                id: 'div1',
                upline: 1,
                bottomBlank: 1,
            },
            {
                type: 'text',
                typeId: 'productName',
                param: {
                    size: 'm',
                    text: '{{productName}}',
                    bold: 1,
                    align: 0,
                },
                id: 'prod1',
            },
            {
                type: 'text',
                typeId: 'printTime',
                param: {
                    size: 's',
                    text: '{{time}}',
                    align: 0,
                    bold: 0,
                },
                id: 'qiBwe',
            },
        ],
        data: {
            pickupNum: '223',
            serialId: '0001',
            serviceType: '{{serviceTypeDINEIN|l}}',
            num: '1',
            total: '5',
            orderFrom: '{{platformPOS|l}}',
            productName: '{{exampleProductName|l}}',
            time: '2025/07/28 17:00:00',
        },
        lang: {
            'zh-CN': {
                base: '基础信息',
                productInfo: '商品信息',
                footerGroup: '底栏',
                pickupNum: '取餐号',
                serialNumTitle: '流水号/餐牌号',
                serviceTypeTitle: '就餐方式',
                serviceTypeDINEIN: '堂食',
                orderFromTitle: '订单来源',
                platformPOS: 'POS订单',
                productName: '商品名称',
                printTime: '打印时间',
                exampleProductName: '冰美式-大杯',
            },
        },
    };

    await print(template, template.data);
});