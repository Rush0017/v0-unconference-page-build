import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Video, Users } from "lucide-react"

export default function SchedulePage() {
  const eventDate = new Date("2024-11-21")
  const isPreEvent = new Date() < eventDate

  const scheduleItems = [
    {
      time: "09:00 - 09:30",
      title: "Welcome & Opening",
      description: "Introduction to the unconference format and community guidelines",
      type: "plenary",
    },
    {
      time: "09:30 - 10:30",
      title: "Session Proposals & Voting",
      description: "Participants propose topics and vote on the most interesting sessions",
      type: "interactive",
    },
    {
      time: "10:30 - 10:45",
      title: "Coffee Break",
      description: "Networking and informal discussions",
      type: "break",
    },
    {
      time: "10:45 - 11:45",
      title: "Session Block 1",
      description: "First round of participant-led sessions in breakout rooms",
      type: "session",
    },
    {
      time: "11:45 - 12:45",
      title: "Session Block 2",
      description: "Second round of participant-led sessions",
      type: "session",
    },
    {
      time: "12:45 - 13:45",
      title: "Lunch Break",
      description: "Extended break for lunch and informal networking",
      type: "break",
    },
    {
      time: "13:45 - 14:45",
      title: "Session Block 3",
      description: "Third round of participant-led sessions",
      type: "session",
    },
    {
      time: "14:45 - 15:45",
      title: "Session Block 4",
      description: "Final round of participant-led sessions",
      type: "session",
    },
    {
      time: "15:45 - 16:00",
      title: "Closing & Next Steps",
      description: "Wrap-up, key takeaways, and planning for future events",
      type: "plenary",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "plenary":
        return "bg-primary/10 text-primary"
      case "session":
        return "bg-blue-50 text-blue-700"
      case "interactive":
        return "bg-green-50 text-green-700"
      case "break":
        return "bg-orange-50 text-orange-700"
      default:
        return "bg-gray-50 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-light">Event Schedule</h1>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {eventDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Virtual Event</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>🌍 All times UTC</span>
            </div>
          </div>
        </div>

        {/* Schedule Timeline */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-light text-center mb-8">Daily Timeline</h2>

          <div className="space-y-4">
            {scheduleItems.map((item, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-lg font-mono font-medium text-primary">{item.time}</div>
                      <div
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getTypeColor(item.type)}`}
                      >
                        {item.type}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>

                    {item.type === "session" && (
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>Breakout Rooms</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Virtual Event Info */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Virtual Event Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This is a virtual unconference hosted online on November 21, 2024. All sessions will be conducted via
              video conference with interactive breakout rooms for smaller group discussions and networking
              opportunities.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Platform:</span>
                <span className="text-sm text-muted-foreground">Zoom (links provided to registered attendees)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Time Zone:</span>
                <span className="text-sm text-muted-foreground">UTC (times shown in your local timezone)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Recording:</span>
                <span className="text-sm text-muted-foreground">Sessions will be recorded with speaker consent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Requirements:</span>
                <span className="text-sm text-muted-foreground">Stable internet, webcam, microphone recommended</span>
              </div>
            </div>
            {isPreEvent && (
              <Button asChild className="w-full mt-4">
                <a href="/#rsvp-section">RSVP to Receive Access Links →</a>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-medium">What is an Unconference?</h3>
          <p className="text-muted-foreground">
            An unconference is a participant-driven meeting where the agenda is created by attendees at the beginning of
            the event. Topics are proposed, voted on, and sessions are led by community members based on their interests
            and expertise.
          </p>
        </div>
      </div>
    </div>
  )
}
