
// import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { DialogDemo } from "./DialogDemo"

export function TabsDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="portfolio">
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio">
          <Card className='rounded-tl-none'>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
               
              </CardDescription>
              <DialogDemo/>
            </CardHeader>
            <CardContent className="grid gap-6">
            </CardContent>
            <CardFooter className='justify-end'>
              
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card className='rounded-tl-none'>
            <CardHeader>
              <CardTitle></CardTitle>
              <CardDescription>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
            </CardContent>
            <CardFooter>
              <Button></Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
