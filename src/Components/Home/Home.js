import React from 'react';
import { Tooltip, Card, Affix, Space, Button, Input, Spin, Badge, Radio, Menu, Dropdown, Row, Col } from "antd";
import { UndoOutlined, SaveOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { Formik, Form, Field, FieldArray } from 'formik';
import * as firebase from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios'
import data from '../data/data.json'

let config = {
    apiKey: "AIzaSyCla8phLkpyt7-XasW1F9BacqZHfVVE_iI",
    authDomain: "fyp-annotator.firebaseapp.com",
    projectId: "fyp-annotator",
    storageBucket: "fyp-annotator.appspot.com",
    messagingSenderId: "141172597635",
    appId: "1:141172597635:web:304cc547ff8fa39a47ccb6",
    measurementId: "G-8DRETCY4ZW"

};

const firebaseApp = firebase.initializeApp(config);

const { TextArea, } = Input;

const storage = getStorage();

const Home = () => {
    const [randomArray, setRandomArray] = React.useState([]);
    const a = 0;
    const array = [1, 2]

    React.useEffect(() => {
        console.log(data)
        setRandomArray([])
        getDownloadURL(ref(storage, 'my-file.json'))
            .then((url) => {
                axios.get(url, {
                    headers:
                        { "Access-control-allow-origin": '*', "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": '*' },
                }).then(function (response) {
                    // handle success
                    console.log(response);
                })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            })
            .catch((error) => {
                // Handle any errors
                console.log(error)
            });

        for (var i = 0; i < 25; i++) {
            setRandomArray(randomArray => randomArray.concat(Math.floor(Math.random() * (data.length - 1)) + 1));
        }
    }, [a]);

    function validateText(value) {
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    }



    return (<div>
        <header style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'blue', color: 'white', }}>
            Racist Tweets Annotating tool
        </header>

        <Formik
            initialValues={{
                tweets: data

            }}
            onSubmit={values => {
                // alert(values?.tweets)
                console.log(values)

                var jsonString = JSON.stringify(values);

                var blob = new Blob([jsonString], { type: "application/json" })
                const storage = getStorage(firebaseApp);
                var fileRef = ref(storage, `/files/${values?.name}_${values?.race}_${values?.religion}_${Date().toLocaleString()}.json`)
                uploadBytes(fileRef, blob).then((snapshot) => {
                    console.log('Uploaded a blob!');
                }).catch(e => console.log(e));
            }
            }
            enableReinitialize>
            {({
                values,
                handleSubmit,
                handleReset,
                setFieldValue,
                errors,
                touched,
                isValidating,
                isValid,
                dirty
            }) => (
                <Form onSubmit={handleSubmit}>

                    <div style={{ marginTop: '5px', marginLeft: '15px' }}>

                        <Row><Col span={5}><label style={{margin:'5px',fontWeight:'bold'}}>Name </label></Col><Col span={18}><Field prefix="Name" name='name' placeholder="Name" validate={validateText} style={{width:'60%',margin:'5px'}}/> {errors.name && touched.name && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.name}</div>}</Col></Row>
                        <Row><Col span={5}><label style={{margin:'5px',fontWeight:'bold'}}>Race </label></Col><Col span={18}><Field prefix="" name='race' placeholder="Race" validate={validateText} style={{width:'60%',margin:'5px'}} />{errors.race && touched.race && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.race}</div>}</Col></Row>
                        <Row><Col span={5}><label style={{margin:'5px',fontWeight:'bold'}}>Religion </label></Col><Col span={18}><Field prefix="" name='religion' placeholder="Religion" validate={validateText} style={{width:'60%',margin:'5px'}} />{errors.religion && touched.religion && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.religion}</div>}</Col></Row>
                    </div>

                    <FieldArray
                        name='tweets'
                        render={arryHelpers => (
                            <div>
                                {randomArray.map((x, index) => (
                                    <Card
                                        className="mb-2"
                                        size="small"
                                        tabBarExtraContent={<div className="dot-pos">Tweet</div>}>
                                        <div className="ant-input-wrapper ant-input-group">
                                            <span className="ant-input-group-addon">{index + 1}</span>
                                            <Field as={TextArea} prefix="" name='tweet' placeholder="Tweet" autoSize={{ minRows: 0, maxRows: 6 }} value={values.tweets[x].content} />
                                        </div>
                                        <div>
                                            <Row>
                                                <Col span={8}>
                                                    <Radio.Group onChange={(e) => setFieldValue(`tweets[${x}].Label`, e.target.value)} value={values.tweets[x].Label}>
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
                                                {values.tweets[x].Label == 'racist' ?
                                                    <Col span={16}>
                                                        Violence Intensity
                                                        <Radio.Group onChange={(e) => setFieldValue(`tweets[${x}].Hate_level`, e.target.value)} value={values.tweets[x].Hate_level}>
                                                            <Row>
                                                                <Col>
                                                                    <Radio value={'1'}>1</Radio>
                                                                </Col>
                                                                <Col>
                                                                    <Radio value={'2'}>2</Radio>
                                                                </Col>
                                                                <Col>
                                                                    <Radio value={'3'}>3</Radio>
                                                                </Col>
                                                                <Col>
                                                                    <Radio value={'4'}>4</Radio>
                                                                </Col>
                                                            </Row>
                                                        </Radio.Group>
                                                    </Col> : null}
                                            </Row>
                                        </div>
                                        {/* </Space> */}

                                    </Card>
                                ))
                                }
                            </div>)}
                    />

                    <Affix>
                        <div className="d-flex justify-content-center mb-1">
                            <Space>
                                <Button type="primary" onClick={handleSubmit} disabled={!(isValid && dirty)}>Save</Button> {/*errors.name && touched.name && <div style={{color:'red',fontWeight:'bold'}}>{alert(errors.name)}</div>*/}
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