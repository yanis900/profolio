"use strict";

const React = require("react");
const { Html, Head, Tailwind, Body, Container, Section, Img, Heading, Text, Hr } = require("@react-email/components");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailUser = EmailUser;
var _components = require("@react-email/components");
function EmailUser(_ref) {
  var user = _ref.user,
    email = _ref.email;
  return /*#__PURE__*/React.createElement(_components.Html, null, /*#__PURE__*/React.createElement(_components.Head, null), /*#__PURE__*/React.createElement(_components.Tailwind, null, /*#__PURE__*/React.createElement(_components.Body, {
    className: "mx-auto my-auto bg-white px-2 font-sans"
  }, /*#__PURE__*/React.createElement(_components.Container, {
    className: "mx-auto my-10 max-w-[465px] rounded border border-[#eaeaea] border-solid p-5"
  }, /*#__PURE__*/React.createElement(_components.Section, {
    className: "mt-8"
  }, /*#__PURE__*/React.createElement(_components.Img, {
    className: "rounded-full mx-auto my-0",
    src: (user === null || user === void 0 ? void 0 : user.image) || "https://profolio-project-dev-project-3.s3.eu-west-2.amazonaws.com/default+profile.png",
    width: "64",
    height: "64"
  })), /*#__PURE__*/React.createElement(_components.Heading, {
    className: "mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black"
  }, /*#__PURE__*/React.createElement("strong", null, (user === null || user === void 0 ? void 0 : user.firstname.charAt(0).toUpperCase()) + (user === null || user === void 0 ? void 0 : user.firstname.slice(1).toLowerCase()) || 'User'), ",", /*#__PURE__*/React.createElement("br", null), "you have a new message!"), /*#__PURE__*/React.createElement(_components.Text, {
    className: "text-[14px] text-black leading-6"
  }, /*#__PURE__*/React.createElement("strong", null, "From:"), " ", (email === null || email === void 0 ? void 0 : email.name) || 'Anonymous', ","), /*#__PURE__*/React.createElement(_components.Text, {
    className: "text-[14px] text-black leading-6"
  }, /*#__PURE__*/React.createElement("strong", null, "Subject:"), " ", (email === null || email === void 0 ? void 0 : email.subject) || 'None', ","), /*#__PURE__*/React.createElement(_components.Text, {
    className: "text-[14px] text-black leading-6"
  }, /*#__PURE__*/React.createElement("strong", null, "Message:")), /*#__PURE__*/React.createElement("code", {
    style: code
  }, (email === null || email === void 0 ? void 0 : email.message) || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At ab, cupiditate, magni fugit asperiores provident commodi reiciendis suscipit animi minus hic, vel totam accusamus vitae. Amet placeat ullam rerum eaque!'), /*#__PURE__*/React.createElement(_components.Hr, {
    className: "mx-0 my-[26px] w-full border border-[#eaeaea] border-solid"
  }), /*#__PURE__*/React.createElement(_components.Text, {
    className: "text-[#666666] text-[12px] leading-6"
  }, "This message was intended for ", /*#__PURE__*/React.createElement("span", {
    className: "text-black"
  }, (user === null || user === void 0 ? void 0 : user.firstname) || 'User'), ". If you were not expecting this message, you can ignore this email. If you are concerned about your account's safety, oh well good luck.")))));
}
var code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: '14px',
  lineHeight: '1.5'
};