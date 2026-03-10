# 票据模版——示例工程

收据模板示例与测试项目，用于在 V 系列设备或安卓设备上预览、调试结账单等小票打印效果。

## 功能

- 提供完整的结账单模板（template）+ 订单数据（data）示例
- 通过 `@sunmi/max-print` 的 `print()` 将模板与数据渲染为小票文本并输出
- 支持将打印数据通过 ADB 推送到设备上的 Receipt Tester 应用进行真机预览

## 前置环境

- **Node.js**（建议 v18+）
- **adb**（Android Debug Bridge），并已配置到 PATH
- **一台 V 系列设备**
  - 已安装 Receipt Tester 应用（安装包见 `./assets/receipt_tester_DEBUG_b20250904164701.apk`）

## 安装

```bash
yarn
# 或
npm install
```

## 使用

运行示例测试（会执行模板转换、生成小票文本，并在有设备连接时尝试推送）：

```bash
yarn test
# 或指定用例
yarn test examples/main.test.ts -t "run example"
```

监听模式（修改代码后自动重跑）：

```bash
yarn test:watch
```

运行后可在项目根目录的 `output/` 下查看生成结果：

- `template.json` — 转换后的模板
- `printData.json` — 打印数据
- `receipt.txt` — 小票文本预览

## 项目结构

```
max-receipt/
├── assets/                 # 资源文件（如 receipt-tester.apk）
├── examples/
│   └── main.test.ts        # 结账单模板 + 数据示例及 print 调用
├── output/                 # 运行后生成的模板、打印数据、小票文本
├── package.json
├── jest.config.js          # Jest + ts-jest ESM 配置
└── tsconfig.json
```

## Schema

```jsonc
{
    "id": "string", //小票模板ID
    "createTime": "number", //创建时间戳
    "updateTime": "number", //更新时间戳
    "name": { //小票名称多语言
        "zh": "string",
        "th": "string", 
        "en": "string"
    },
    "schemaVersion": "string", //打印引擎版本
    "version": "string", //该小票对应的版本
    "supported": [80, 58], //支持小票类型
    "defaultLang": "string", //小票兜底语言
    "bizKey": "string", //业务key，如 bill, preliminary, productionOrder 等
    "storeId": "string", //门店ID
    "isDefault": "boolean", //是否默认模板
    "list": [ //打印小票内容列表
        {
            "type": "string", //组件类型: text, image, divider, column, columnInColumn, qr, brcode, staticImage
            "param": {
                //text参数: size(s/m/l), align(0-左/1-中/2-右), bold(0/1), text
                //image参数: data(base64), align, maxWidth
                //staticImage参数: url, align
                //divider参数: style(0-空白/1-实线/2-虚线), height, marginTop, marginBottom
                //column参数: dataKey, columns[{id, weight, text, title, align, show}], level, headerSize, bodySize, titleBold, bodyBold
                //columnInColumn参数: columns[{type, param, weight}] - 支持嵌套列布局
                //qr参数: code, align, iconCfg{icon, imageScale, backgroundColor, codeColor}
                //brcode参数: code, symbology, align
            },
            "typeId": "string", //类型ID，用于模板匹配
            "id": "string", //组件唯一ID
            "edit": "boolean", //是否可编辑
            "show": "boolean", //是否显示
            "hideFields": ["string"], //当这些字段有值时隐藏组件
            "excludeFields": ["string"], //当这些字段有值时排除组件
            "loopKey": "string", //循环数据的key，用于重复渲染
            "upline": "number", //上边距
            "bottomBlank": "number" //下边距
        }
    ],
    "template": { //小票模板定义
        "text": {
            "type": "text",
            "param": {
                "size": "s", //字体大小: s-小号/m-中号/l-大号/xl-特大号
                "align": 0, //对齐方式: 0-左对齐/1-居中/2-右对齐
                "bold": 0, //是否加粗: 0-否/1-是
                "text": "{{variable}}" //文本内容，支持变量{{variable}}和国际化{{key|l}}
            },
            "edit": true
        },
        "image": {
            "type": "image", 
            "param": {
                "data": "", //图片base64数据或变量{{imageData}}
                "align": 0, //对齐方式
                "maxWidth": 200 //最大宽度(可选)
            }
        },
        "staticImage": {
            "type": "staticImage",
            "param": {
                "url": "{{imageUrl}}", //图片URL地址
                "align": 1
            }
        },
        "divider": {
            "type": "divider",
            "param": {
                "style": 2, //分割线样式: 0-空白/1-实线stroke/2-虚线dot
                "height": 3, //高度(已废弃，使用marginTop/marginBottom)
                "marginTop": 3, //上边距
                "marginBottom": 3 //下边距
            }
        },
        "column": {
            "type": "column",
            "param": {
                "dataKey": "orderDetails", //数据源key，从data中获取数组数据
                "columns": [
                    {
                        "id": "name", //列ID
                        "weight": 2, //列宽度权重
                        "text": "{{name}}", //列内容模板
                        "title": "{{menuName|l}}", //列标题(支持国际化)
                        "align": 0, //对齐方式
                        "show": true //是否显示
                    }
                ],
                "level": "children", //层级处理，支持嵌套数据
                "headerSize": "s", //表头字体大小
                "bodySize": "s", //表体字体大小
                "titleBold": 1, //标题是否加粗
                "bodyBold": 0 //内容是否加粗
            }
        },
        "columnInColumn": {
            "type": "columnInColumn",
            "param": {
                "columns": [ //嵌套列定义，支持在列中嵌套其他组件
                    {
                        "type": "text", //嵌套组件类型
                        "param": {
                            "text": "{{variable}}",
                            "size": "s"
                        },
                        "weight": 1 //权重
                    }
                ]
            }
        },
        "qr": {
            "type": "qr",
            "param": {
                "code": "{{qrCodeData}}", //二维码数据
                "align": 1,
                "iconCfg": { //二维码中心图标配置(可选)
                    "icon": "{{iconData}}", //图标数据
                    "imageScale": 20, //图标缩放比例0-50，默认20%
                    "backgroundColor": "white", //背景色white/black
                    "codeColor": "black" //二维码颜色white/black
                }
            }
        },
        "brcode": {
            "type": "brcode", 
            "param": {
                "code": "{{barcodeData}}", //条形码数据
                "symbology": "CODE128", //条形码格式
                "align": 1
            }
        }
    },
    "groups": [ //配置项分组
        {
            "id": "base",
            "name": "{{base|l}}"
        },
        {
            "id": "dishes",
            "name": "{{dishes|l}}"
        },
        {
            "id": "footer",
            "name": "{{footerGroup|l}}"
        }
        //...其他分组: cost, pay, member等
    ],
    "data": { //mock数据，使用双括号包裹 {{variable}}，支持多层级访问{{obj.key}}
        //基础信息
        "name": "string", //门店名称
        "tableName": "string", //桌号
        "orderId": "string", //订单ID
        "serviceType": "string", //服务类型
        "settleTime": "string", //结账时间
        
        //菜品信息 - 支持数组循环渲染
        "orderDetails": [
            {
                "name": "string", //菜品名称
                "price": "string", //单价
                "count": "string", //数量
                "amount": "string", //小计
                "children": [ //嵌套子项(做法、加料等) - 支持level="children"渲染
                    {
                        "name": "string", //做法、加料等
                        "price": "string"
                    }
                ]
            }
        ],
        
        //费用支付信息
        "payableAmount": "string", //应付金额
        "payAmount": "string", //实付金额
        "payInfo": [ //支付详情数组
            {
                "name": "string", //支付方式
                "amount": "string" //支付金额
            }
        ],
        
        //会员信息
        "memberCardId": "string", //会员卡号
        "memberName": "string", //会员姓名
        "totalPoint": "string", //累计积分
        
        //图片和二维码数据
        "logoData": "data:image/png;base64,xxx", //base64图片数据
        "qrCodeData": "https://example.com", //二维码内容
        "barcodeData": "123456789" //条形码内容
        //...其他数据字段
    },
    "columns": {}, //列配置（暂未使用）
    "types": [ //配置项类型定义
        {
            "typeId": "string", //类型ID
            "name": "string", //显示名称，支持国际化 {{name|l}}
            "groupId": "string", //所属分组ID
            "templateId": "string", //对应的模板ID
            "isBottom": "boolean" //是否追加到最后
        }
    ],
    "extra": {
        "addition": ["string"] //不显示的组件ID列表
    },
    "lang": {
        //多语言定义，用双括号包裹，如{{variable|l}}，后面加 |l 表示是语言词条
        "zh-CN": {
            "base": "基础信息",
            "dishes": "菜品信息",
            "footerGroup": "底栏",
            "customText": "自定义文本",
            "customImg": "自定义图片"
            //...其他词条
        },
        "en-US": {
            "base": "Basic Information",
            "dishes": "Dish Information",
            "footerGroup": "Footer",
            "customText": "Custom Text",
            "customImg": "Custom Image"
            //...其他词条
        },
        "th": {
            "base": "ข้อมูลพื้นฐาน",
            "dishes": "ข้อมูลเมนู",
            "footerGroup": "ส่วนท้าย",
            "customText": "ข้อความที่กำหนดเอง",
            "customImg": "รูปภาพที่กำหนดเอง"
            //...其他词条
        }
    }
}
```

## 开始调试

```typescript
import { print } from '@sunmi/max-print';

test('run example', async () => {
    const template = {}

    await print(template, template.data);
});
```

## 相关链接

- [Issues](https://github.com/sunmi-web/max-receipt/issues)
- [@sunmi/max-print](https://www.npmjs.com/package/@sunmi/max-print)

