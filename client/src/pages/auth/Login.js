import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Row, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  getUserPending,
  getUserFail,
  loginAndSave,
} from "../../redux/authSlice";
import * as services from "../../actions/services.js";

const layout = {
  wrapperCol: { span: 24 },
};

const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      message.error("Oled juba sisse loginud.");
      history.push("/");
    }
  }, []);

  const onFinish = (values) => {
    dispatch(getUserPending());
    services
      .login(values)
      .then((res) => {
        dispatch(loginAndSave(res));
        message.success("Sisse logimine õnnestus!");
        history.push("/");
      })
      .catch((e) => {
        dispatch(getUserFail("Viga sisselogimisel"));
        if (e instanceof Error) return message.error("Viga serveriga");
        message.error(e);
      });
  };

  return (
    <Row type="flex" justify="flex-start" align="center">
      <Form
        {...layout}
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        size={"middle"}
        style={{ width: 200 }}
      >
        <h1 className="text-center">Logi sisse</h1>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Palun sisesta e-mail" },
            { type: "email", message: "Peab olema korrektne e-mail" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Palun sisesta parool!" },
            { min: 6, message: "Vähemalt 6 tähemärki pikk" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Parool"
          />
        </Form.Item>
        <Form.Item {...layout}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Logi sisse
          </Button>
          <Link to="/signup">või registreeru</Link>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default Login;
