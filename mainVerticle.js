import Router from "vertx-web-js/router";
import BodyHandler from "vertx-web-js/body_handler";
const server = vertx.createHttpServer();

const router = Router.router(vertx);
router.route().handler(BodyHandler.create().handle);

router.get("/api/getObject").handler((routingContext) => {
  let response = routingContext.response();
  response.putHeader("content-type", "application/json");
  response.end(JSON.stringify({
    name: "John",
    mobileNumber: 88886666,
    address: { street: "60 Anson Road, Singapore", postalCode: "098657" }
  }));
});

router.get("/api/getArray").handler((routingContext) => {
  let response = routingContext.response();
  response.putHeader("content-type", "application/json");
  response.end(JSON.stringify(["index1", "index2"]));
});

router.get("/api/getPlaintext").handler((routingContext) => {
  let response = routingContext.response();
  response.putHeader("content-type", "text/plain");
  response.end("Hello World Raml!");
});

router.get("/api/getTwoSum").handler((routingContext) => {
  let response = routingContext.response();
  let a = routingContext.request().getParam("A") ? parseInt(routingContext.request().getParam("A")) : 0;
  let b = routingContext.request().getParam("B") ? parseInt(routingContext.request().getParam("B")) : 0;
  response.putHeader("content-type", "text/plain");
  response.end((a + b).toString());
});

router.get("/api/getTwoSum/:A/:B").handler((routingContext) => {
  let response = routingContext.response();
  let a = routingContext.request().getParam("A") ? parseInt(routingContext.request().getParam("A")) : 0;
  let b = routingContext.request().getParam("B") ? parseInt(routingContext.request().getParam("B")) : 0;
  response.putHeader("content-type", "text/plain");
  response.end((a + b).toString());
});

router.post("/api/getTwoSum").handler((routingContext) => {
  let response = routingContext.response();
  let requestJson = routingContext.getBodyAsJson() ? routingContext.getBodyAsJson() : {};
  let a = requestJson.A ? parseInt(requestJson.A) : 0;
  let b = requestJson.B ? parseInt(requestJson.B) : 0;
  response.putHeader("content-type", "text/plain");
  response.end((a + b).toString());
});

server.requestHandler(router.accept).listen(8080);
