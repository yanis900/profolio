import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export function EmailUser ({ user, email }) {

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-10 max-w-[465px] rounded border border-[#eaeaea] border-solid p-5">
            <Section className="mt-8">
              <Img
                    className="rounded-full mx-auto my-0"
                    src={user?.image || "https://profolio-project-dev-project-3.s3.eu-west-2.amazonaws.com/default+profile.png"}
                    width="64"
                    height="64"
                  />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              <strong>{user?.firstname.charAt(0).toUpperCase() + user?.firstname.slice(1).toLowerCase() || 'User'}</strong>,<br />
               you have a new message!
            </Heading>
            <Text className="text-[14px] text-black leading-6">
               <strong>From:</strong> {email?.name || 'Anonymous'},
            </Text>
            <Text className="text-[14px] text-black leading-6">
               <strong>Subject:</strong> {email?.subject || 'None'},
            </Text>
            <Text className="text-[14px] text-black leading-6">
              <strong>Message:</strong>
            </Text>
              <code style={code}>
               {email?.message || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At ab, cupiditate, magni fugit asperiores provident commodi reiciendis suscipit animi minus hic, vel totam accusamus vitae. Amet placeat ullam rerum eaque!'}
              </code>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-6">
              This message was intended for <span className="text-black">{user?.firstname || 'User'}</span>.
              If you were not expecting this message, you can ignore this email.
              If you are concerned about your account&apos;s safety, oh well good luck.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const code = {
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