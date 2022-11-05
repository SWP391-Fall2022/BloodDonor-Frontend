import { Breadcrumb } from "antd";

//A organization breadcrumb used in every situation
//layer: layer1/layer2/... (Update this if breadcrumb is longer)
//If layer doesn't have a string, just pass a string
//If layer has link, asign a link component to variable and asign this variable to layer prop
//name: The name of the page is on, no name props is fine
export function AdBread(props) {
    return (
        <div>
            <Breadcrumb style={{ padding: '1% 0 0 2%' }}>
                <Breadcrumb.Item>{props.layer1}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.layer2}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.layer3}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.layer4}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.layer5}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ fontSize: 'large', padding: ' 1% 2% 2% 2%' }}><strong>{props.name}</strong></div>
        </div>
    )
}