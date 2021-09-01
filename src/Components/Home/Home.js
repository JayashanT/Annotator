import React from 'react';
import { Tooltip, Card, Affix, Space, Button, Input, Spin, Badge, Radio, Menu, Dropdown, Row, Col } from "antd";
import { UndoOutlined, SaveOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { Formik, Form, Field, FieldArray } from 'formik';
import * as firebase from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios'

let config = {
    apiKey: "AIzaSyCla8phLkpyt7-XasW1F9BacqZHfVVE_iI",
    projectId: "fyp-annotator",
    authDomain: "fyp-annotator.firebaseapp.com",
    storageBucket: "fyp-annotator.appspot.com",
};
const firebaseApp = firebase.initializeApp(config);

const { TextArea, } = Input;

const storage = getStorage(firebaseApp);

const Home = () => {

    const data = [
        {
            "content": "1@AEHarrod @acesnead @JamieGlazov @diana_west_ Thanks for the retweet, I appreciate you getting the message out. Solidarity! \u270a\ud83c\udffd#BlackLivesMatter #DefundThePolice",
            "id": "1.27E+18",
            "Label": "default",
            "Hate_level": "default"
        },
        {
            "content": "2@AEHarrod @acesnead @JamieGlazov @diana_west_ Thanks for the retweet, I appreciate you getting the message out. Solidarity! \u270a\ud83c\udffd#BlackLivesMatter #DefundThePolice",
            "id": "1.27E+18",
            "Label": "default",
            "Hate_level": "default"
        },
        {
            "content": "3@AEHarrod @acesnead @JamieGlazov @diana_west_ Thanks for the retweet, I appreciate you getting the message out. Solidarity! \u270a\ud83c\udffd#BlackLivesMatter #DefundThePolice",
            "id": "1.27E+18",
            "Label": "default",
            "Hate_level": "default"
        },
        {
            "content": "4@AEHarrod @acesnead @JamieGlazov @diana_west_ Thanks for the retweet, I appreciate you getting the message out. Solidarity! \u270a\ud83c\udffd#BlackLivesMatter #DefundThePolice",
            "id": "1.27E+18",
            "Label": "default",
            "Hate_level": "default"
        },
        {
            "content": "5@AEHarrod @acesnead @JamieGlazov @diana_west_ Thanks for the retweet, I appreciate you getting the message out. Solidarity! \u270a\ud83c\udffd#BlackLivesMatter #DefundThePolice",
            "id": "1.27E+18",
            "Label": "default",
            "Hate_level": "default"
        },
    ]

    const [randomArray, setRandomArray] = React.useState([]);
    const a = 0;
    const array = [1, 2]

    React.useEffect(() => {
        setRandomArray([])
        getDownloadURL(ref(storage, 'my-file.json'))
            .then((url) => {
                axios.get(url, {
                    headers:
                        { "access-control-allow-origin": '*',"Access-Control-Allow-Headers": "*","Access-Control-Allow-Methods":'*'  },
                    responseType:'blob'
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
            alert(values?.tweets)

            var jsonString = JSON.stringify(values?.tweets);

            var blob = new Blob([jsonString], { type: "application/json" })

            // create a reference to the storage
            const storage = getStorage(firebaseApp);
            // Create a reference to the file you are about to create
            // the reference points to "/BUCKET_NAME/FILE_NAME.json"
            // upload you blob into the storage 
            var fileRef = ref(storage, "/files/my-file.json")
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

                    <Row><Field prefix="Name" name='name' placeholder="Name" validate={validateText} />  {errors.name && touched.name && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.name}</div>}</Row>
                    <Row><Field prefix="" name='race' placeholder="Race" validate={validateText} />{errors.race && touched.race && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.race}</div>}</Row>
                    <Row><Field prefix="" name='religion' placeholder="Religion" validate={validateText} />{errors.religion && touched.religion && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.religion}</div>}</Row>
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