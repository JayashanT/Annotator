import React from 'react';
import { Tooltip, Card, Affix, Space, Button, Input, Radio, Row, Col, message, Modal } from "antd";
// import { UndoOutlined, SaveOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { Formik, Form, Field, FieldArray } from 'formik';
import * as firebase from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
// import * as Yup from "yup";
import data from '../data/data.json';

let config = {
    // apiKey: "AIzaSyCla8phLkpyt7-XasW1F9BacqZHfVVE_iI",
    // authDomain: "fyp-annotator.firebaseapp.com",
    // projectId: "fyp-annotator",
    // storageBucket: "fyp-annotator.appspot.com",
    // messagingSenderId: "141172597635",
    // appId: "1:141172597635:web:304cc547ff8fa39a47ccb6",
    // measurementId: "G-8DRETCY4ZW"

    //new gmail
    apiKey: "AIzaSyCoU1j7DTZ_xFGeqC4v_GEePrMQVcAq62E",
    authDomain: "fyp-team-beta.firebaseapp.com",
    projectId: "fyp-team-beta",
    storageBucket: "fyp-team-beta.appspot.com",
    messagingSenderId: "1045149403875",
    appId: "1:1045149403875:web:15d0c4c9382343b10f53d6",
    measurementId: "G-R7F765CNFC"

};

const firebaseApp = firebase.initializeApp(config);

const { TextArea, } = Input;

const storage = getStorage();

const Home = () => {
    const [randomArray, setRandomArray] = React.useState([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isModalAboutVisible, setIsModalAboutVisible] = React.useState(false);
    const [isModalRacistVisible, setIsModalRacistVisible] = React.useState(false);
    const array = []
    const a = 0;

    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModalAbout = () => {
        setIsModalAboutVisible(true);
    };
    const showModalRacist = () => {
        setIsModalRacistVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setIsModalAboutVisible(false);
        setIsModalRacistVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalAboutVisible(false);
        setIsModalRacistVisible(false);
    };

    React.useEffect(() => {
        // getDownloadURL(ref(storage, 'my-file.json'))
        //     .then((url) => {
        //         axios.get(url, {
        //             headers:
        //                 { "Access-control-allow-origin": '*', "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": '*' },
        //         }).then(function (response) {
        //             // handle success
        //             console.log(response);
        //         })
        //             .catch(function (error) {
        //                 // handle error
        //                 console.log(error);
        //             })
        //     })
        //     .catch((error) => {
        //         // Handle any errors
        //         console.log(error)
        //     });

        var val;
        while (array.length < 40) {
            val = Math.floor(Math.random() * (data.length - 1)) + 1
            if (array.includes(val) === false) {
                array.push(val)
            }

            setRandomArray(array);
        }
    }, [a]);

    function validateText(value) {
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    }



    return (
        <div style={{ backgroundImage: `linear-gradient(to right,#DCE35B,#45B649)` }}>

            <h3 style={{ textAlign: 'center', fontWeight: 'bold', color: 'Green', backgroundColor: 'white', borderRadius: '0 0 70% 70%', paddingBottom: '15px', paddingTop: '15px' }}>Racist Tweets Annotating tool </h3>

            <Affix >
                <div className="d-flex justify-content-end mb-1" style={{ width: '100%', paddingRight: 5, backgroundImage: `linear-gradient(to right,#DCE35B,#45B649)` }}>
                    <Tooltip placement="bottom" title={<span>Guidelines about how to annotate the tweets</span>}>
                        <Button type='primary' onClick={showModal} style={{ color: 'Green', backgroundColor: 'white' }}>
                            Show Guidelines
                        </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title={<span>How to identify a racist text content</span>}>
                        <Button type='primary' onClick={showModalRacist} style={{ color: 'Green', backgroundColor: 'white' }}>
                            Racist ?
                        </Button>
                    </Tooltip>
                    <Button type='primary' onClick={showModalAbout} style={{ color: 'Green', backgroundColor: 'white' }}>
                        About
                    </Button>
                </div>
            </Affix>

            <Formik
                initialValues={{
                    tweets: data

                }}
                onSubmit={values => {
                        
                        
                    var jsonString = JSON.stringify(values);

                    var blob = new Blob([jsonString], { type: "application/json" })
                    const storage = getStorage(firebaseApp);
                    var fileRef = ref(storage, `/files/${values?.name}_${values?.race}_${values?.religion}_${Date().toLocaleString()}.json`)
                    const hide = message.loading({content:'Submitting..',duration:0,style:{marginTop: '10vh',color:'#007FFF'},})
                    uploadBytes(fileRef, blob).then((snapshot) => {
                        setTimeout(hide);
                        message.success({content:'Submitted. Thank You !..',duration:8,style:{marginTop: '10vh',color:'#007FFF'},})
                        message.loading({content:'Refreshing...',duration:5,style:{color:'#007FFF'},})
                        
                    }).then(()=>setTimeout(window.location.reload(),5000)).catch(e => console.log(e));
                    
                }
                }
                // validationSchema={Yup.object().shape({
                //     racistGroup1: Yup.string().required("Racist or Non-Racist for each tweet is needed"),})}
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

                        <div style={{ backgroundImage: `linear-gradient(to right,#DCE35B,#45B649)` }}>
                            <Modal title="Guidelines" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} >
                                <p>This page contain 25 random tweets. </p>
                                <p>Read the tweet and annotate it has Racist or Non-Racist (Press racist button see more about Racism)</p>
                                <p>Then if a tweet is racist give the violence intensity from 1 to 4 based on below points ,</p>
                                <p>
                                    A Racist tweet can have a content of,
                                    <ul>
                                        <li>Uses a racial slur.</li>
                                        <li>Attacks a minority / majority.</li>
                                        <li>Seeks to silence a minority.</li>
                                        <li>Criticizes a minority / majority (without a well founded argument).</li>
                                        <li>Promotes, but does not directly use, hate speech or violent crime.</li>
                                        <li>Blatantly misrepresents truth or seeks to distort views on a minority with unfounded claims.</li>
                                        <li>Shows support of problematic hash tags.</li>
                                        <li>Negatively stereotypes a minority.</li>
                                        <li>contains a screen name that is offensive, as per the previous criteria, the tweet is ambiguous (at best), and the tweet is on a topic that satisfies any of the above criteria.</li>
                                    </ul>
                                    <ul>
                                        <li>Degree 1</li>
                                        <ul>
                                            <li>There is no explicit incitement, but the acts ascribe a negative feature or quality to a targeted group.</li>
                                            <li>It implies or legitimates discriminating attitudes or policies against the given target.</li>
                                        </ul>
                                        <li>Degree 2</li>
                                        <ul>
                                            <li>There is direct incitement by individuals to target.</li>
                                            <li>Threatening, intimidate, harass, insulting and abusive behavior toward the target.</li>
                                            <li>These acts are not calling to violence, but they raise aversion or hate towards the targeted group. </li>
                                        </ul>
                                        <li>Degree 3</li>
                                        <ul>
                                            <li>There is explicit incitement or promotion to the gather, fight or protest to against target.</li>
                                            <li>Motivate community to gather and spread his/him social events against target.</li>
                                            <li>Appreciate the community who support to promote the hatred. </li>
                                            <li>Use the reference events to promote the extreme ideology. </li>
                                        </ul>
                                        <li>Degree 4</li>
                                        <ul>
                                            <li>There is explicit incitement or promotion to the gather, fight or protest to against target.</li>
                                            <li>The speaker overtly suggests or calls for these actions and declares him/herself ready to carry them out or take part in their realization.</li>
                                            <li>The message that aims at dehumanizing, hurting or killing, arson, vandalism, desecration towards the target. </li>
                                            <li>Accept the violation activities.</li>
                                        </ul>
                                    </ul>
                                </p>

                            </Modal>
                            <Modal title="About us" visible={isModalAboutVisible} onOk={handleOk} onCancel={handleCancel} footer={null} >
                                <p>
                                    We are a group of final year undergraduates of Faculty of Information Technology University of Moratuwa, This data is collected for our final year research project.
                                </p>
                                <p>
                                    Thank You for supporting us.
                                </p>
                            </Modal>
                            <Modal title="Racist Content" visible={isModalRacistVisible} onOk={handleOk} onCancel={handleCancel} footer={null} >
                                <p>Racism is the scientifically false belief that groups of humans possess different behavioral traits corresponding to physical appearance and can be divided based on the superiority of one race over another.</p>
                                <p>A belief that race is a fundamental determinant of human traits and capacities and that racial differences produce an inherent superiority of a particular race</p>
                                <p>
                                    A Racist tweet can have a content of,
                                    <ul>
                                        <li>Uses a racial slur.</li>
                                        <li>Attacks a minority / majority.</li>
                                        <li>Seeks to silence a minority.</li>
                                        <li>Criticizes a minority / majority (without a well founded argument).</li>
                                        <li>Promotes, but does not directly use, hate speech or violent crime.</li>
                                        <li>Blatantly misrepresents truth or seeks to distort views on a minority with unfounded claims.</li>
                                        <li>Shows support of problematic hash tags.</li>
                                        <li>Negatively stereotypes a minority.</li>
                                        <li>contains a screen name that is offensive, as per the previous criteria, the tweet is ambiguous (at best), and the tweet is on a topic that satisfies any of the above criteria.</li>
                                    </ul>
                                </p>
                            </Modal>
                            <div style={{ marginTop: '5px', marginLeft: '15px' }}>


                                <Row><Col span={5}><label style={{ margin: '5px', fontWeight: 'bold', color: 'white' }}>Name </label></Col><Col span={18}><Field prefix="Name" name='name' placeholder="Name" validate={validateText} style={{ width: '60%', margin: '5px', borderRadius: '20px' }} /> {errors.name && touched.name && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.name}</div>}</Col></Row>
                                <Row><Col span={5}><label style={{ margin: '5px', fontWeight: 'bold', color: 'white' }}>Race </label></Col><Col span={18}><Field prefix="" name='race' placeholder="Race" validate={validateText} style={{ width: '60%', margin: '5px', borderRadius: '20px' }} />{errors.race && touched.race && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.race}</div>}</Col></Row>
                                <Row><Col span={5}><label style={{ margin: '5px', fontWeight: 'bold', color: 'white' }}>Religion </label></Col><Col span={18}><Field prefix="" name='religion' placeholder="Religion" validate={validateText} style={{ width: '60%', margin: '5px', borderRadius: '20px' }} />{errors.religion && touched.religion && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.religion}</div>}</Col></Row>
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
                                                    <Field as={TextArea} prefix="" name='tweet' placeholder="Tweet" autoSize={{ minRows: 0, maxRows: 12 }} value={values.tweets[x].content} />
                                                </div>
                                                <div>
                                                    <Row>
                                                        <Col span={9}>
                                                            <Radio.Group id="racistGroup" onChange={(e) => setFieldValue(`tweets[${x}].Label`, e.target.value)} value={values.tweets[x].Label}>
                                                                <Row>
                                                                    <Col>
                                                                        <Radio value={'racist'} style={{ fontWeight: 'bold', color: 'red' }}>Racist</Radio>
                                                                    </Col>
                                                                    <Col>
                                                                        <Radio value={'non-racist'} style={{ fontWeight: 'bold', color: 'Green' }}>Non-Racist</Radio>
                                                                    </Col>
                                                                </Row>
                                                            </Radio.Group>
                                                        </Col>
                                                        {values.tweets[x].Label == 'racist' ?
                                                            <Col span={15}>
                                                                <div style={{ fontWeight: 'bold', marginBottom: 2 }}> Violence Intensity</div>
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

                                                <div>
                                                    <label>{values.tweets[x].Label_by_us} : {values.tweets[x].Hate_level_by_us}</label>
                                                </div>

                                            </Card>
                                        ))
                                        }
                                    </div>)}
                            />

                            <Affix>
                                <div className="d-flex justify-content-center mb-1" style={{ paddingBottom: 10 }}>
                                    <Space>
                                        <Button type="primary" onClick={handleSubmit} disabled={!(isValid && dirty)}>Save</Button> {/*errors.name && touched.name && <div style={{color:'red',fontWeight:'bold'}}>{alert(errors.name)}</div>*/}
                                    </Space>
                                </div>
                            </Affix>
                        </div>
                    </Form>
                )
                }


            </Formik>

        </div>);
}

export default Home