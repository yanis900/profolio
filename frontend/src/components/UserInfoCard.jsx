
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserDialogDemo } from "./UserDialogDemo"
import { CardAction } from "./ui/card"

export function UserInfoCard(props) {
    return (
            <Card className='rounded-tl-none'>
                <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>
                    {props.user &&
                    (
                        <>
                        <Card className="m-20">
                        <div>
                        <Card > First Name: {props.user.firstname} </Card>
                        <Card > Last Name: {props.user.lastname} </Card>
                        <Card > Bio: {props.user.bio} </Card>
                        <Card > Job Title: {props.user.jobtitle} </Card>
                        <Card > Open To Work: {props.user.opentowork} </Card>
                        <Card > Location: {props.user.location} </Card>
                        <Card > LinkedIn: {props.user.links[0]} </Card>
                        <Card > Github: {props.user.links[1]} </Card>
                        <Card > Website: {props.user.links[2]} </Card>
                        </div>
                        </Card>
                        </>
                    )
                    }
                </CardDescription>
                <CardAction>
                    <UserDialogDemo user={props.user} />
                </CardAction>
                </CardHeader>
                <CardContent className="grid gap-6">
                </CardContent>
                <CardFooter className='justify-end'>
                
                </CardFooter>
            </Card>
    )
}