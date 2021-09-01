import React from 'react';
import { Tooltip, Card, Affix, Space, Button, Input, Spin, Badge, Radio, Menu, Dropdown, Row, Col } from "antd";
import { UndoOutlined, SaveOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { Formik, Form, Field, FieldArray } from 'formik';

const { TextArea, } = Input;

const Home = () => {
    const [value, setValue] = React.useState('non-racist');
    const [score, setScore] = React.useState('default');

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
                tweets:[1,2,3,4]

            }}
            onSubmit={values => {

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
                    <FieldArray
                    name='tweets'
                    render={arryHelpers=>(
                    <div>
                        {values.tweets.map((x)=>(
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
                                    {value =='racist' ? 
                                    <Col span={16}>
                                        Violence Intensity
                                    <Radio.Group onChange={onChange} value={score}>
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
                                    </Col>:null}
                                </Row>
                                </div>
                            {/* </Space> */}
                        
                    </Card>
                    ))
                    }
                    </div>)}
                    />

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