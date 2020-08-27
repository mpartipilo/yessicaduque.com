import React from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Fade,
  Card,
  CardBody,
} from "reactstrap";

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: "",
    };
  }

  render() {
    const { status } = this.state;
    return (
      <Form
        onSubmit={this.submitForm}
        action="https://formspree.io/moqkanqw"
        method="POST"
      >
        <Card>
          <CardBody>
            {(status === "" || status === "ERROR") && (
              <>
                <FormGroup>
                  <Label for="name">Name:</Label>
                  <Input type="text" name="name" id="name" placeholder="Name" />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email:</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="message">Tell me about your project:</Label>
                  <Input type="textarea" name="message" />
                </FormGroup>
                <FormGroup>
                  <Label for="budget">Do you have a budget?</Label>
                  <Input
                    type="text"
                    name="budget"
                    id="budget"
                    placeholder="Budget"
                  />
                </FormGroup>
              </>
            )}
            <Fade in={status === "SUCCESS"} tag="h3">
              <Row>
                <Col className="text-center">Thanks!</Col>
              </Row>
            </Fade>
            {status === "ERROR" && <p>Ooops! There was an error.</p>}
            <div className="text-center">
              <Button>Submit</Button>
            </div>
          </CardBody>
        </Card>
      </Form>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}
