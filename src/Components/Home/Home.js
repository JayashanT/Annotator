import React from 'react';
import { Tooltip, Card, Affix, Space, Button, Input, Spin, Badge, Radio, Menu, Dropdown, Row, Col } from "antd";
import { UndoOutlined, SaveOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { Formik, Form, Field, FieldArray } from 'formik';

const { TextArea, } = Input;

const Home = () => {
    const [value, setValue] = React.useState(1);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    }

    function handleButtonClick(e) {
        // message.info('Click on left button.');
        console.log('click left button', e);
    }

    function handleMenuClick(e) {
        // message.info('Click on menu item.');
        console.log('click', e);
    }

    return (<div>
        <header style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'blue', color: 'white', }}>
            Racist Tweets Annotating tool
        </header>

        <Formik
            initialValues={{
                //   transEN: [props.translationEN?.[props.currentKey]],
                //   transNO: [props.translationNO?.[props.currentKey]]
            }}
            onSubmit={values => {
                //   const submitEN = { ...props.translationEN, [props.currentKey]: { ...values.transEN[0] } }
                //   const submitNO = { ...props.translationNO, [props.currentKey]: { ...values.transNO[0] } }
                //   props.saveTranslationsStart({ en: submitEN, no: submitNO, fileName: props.fileName });
                //   setTabChange({})
            }
            }
            enableReinitialize>
            {({
                values,
                handleSubmit,
                handleReset,
                setFieldValue
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Card
                        className="mb-2"
                        size="small"
                        tabBarExtraContent={<div className="dot-pos">Tweet</div>}>

                        <div className="ant-input-wrapper ant-input-group">
                            <span className="ant-input-group-addon">1</span>
                            <Field as={TextArea} prefix="" name='tweet' placeholder="Tweet" autoSize={{ minRows: 0, maxRows: 6 }} />
                            </div>
                            {/* <Space style={{width:'100%'}}> */}
                            <div>
                                <Row>
                                    <Col span={8}>
                                        <Radio.Group onChange={onChange} value={value}>
                                            <Row>
                                                <Col>
                                                    <Radio value={'racist'}>Racist</Radio>
                                                </Col>
                                                <Col>
                                                    <Radio value={'non-racist'}>Non-Racist</Radio>
                                                </Col>
                                            </Row>
                                        </Radio.Group>
                                    </Col>
                                    <Col span={16}>
                                        Violence Intensity
                                    <Radio.Group onChange={onChange} value={value}>
                                            <Row>
                                                <Col>
                                                    <Radio value={1}>1</Radio>
                                                </Col>
                                                <Col>
                                                    <Radio value={2}>2</Radio>
                                                </Col>
                                                <Col>
                                                    <Radio value={3}>3</Radio>
                                                </Col>
                                                <Col>
                                                    <Radio value={4}>4</Radio>
                                                </Col>
                                            </Row>
                                        </Radio.Group>
                                        {/* <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
                                            Hate Level
                                        </Dropdown.Button> */}
                                    </Col>
                                </Row>
                                </div>
                            {/* </Space> */}
                        
                    </Card>

                    <Affix>
                        <div className="d-flex justify-content-end mb-1">
                            <Space>
                                <Button type="primary" onClick={handleSubmit}>Save</Button>
                                {/* <Button onClick={handleReset}>Reset All</Button> */}
                                {/* <Button onClick={toggleLng}>Change LNG</Button> */}
                            </Space>
                        </div>
                    </Affix>
                </Form>
            )
            }


        </Formik>

    </div>);
}

export default Home