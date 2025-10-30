import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { capitalise } from "../utils/capitalise";
import { MapPin } from "lucide-react";

export function UserSearchResults({ results, handleUserClick }) {
  return (
    <>
      {results.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <p className="text-lg text-muted-foreground">
              No users found matching your search.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try a different name or search term.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {results.map((user) => (
            <Card
              key={user._id}
              className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#FFD300] "
              onClick={() => handleUserClick(user)}
            >
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-4">
                    <img
                      src={user.image}
                      alt={`${user.firstname} ${user.lastname}`}
                      className="w-30 h-30 rounded-full object-cover"
                    />

                    <div className="flex-1 text-left">
                      <h4 className="text-xl font-semibold">
                        {capitalise(user.firstname)} {capitalise(user.lastname)}
                      </h4>

                      {user.jobtitle && (
                        <p className="text-sm font-normal text-muted-foreground">
                          {capitalise(user.jobtitle)}
                        </p>
                      )}

                      <div className="flex gap-2 mt-2 items-center flex-wrap">
                        {user.opentowork && (
                          <Badge
                            variant="outline"
                            className="border-2 border-blue-500 text-blue-600"
                          >
                            Open to work
                          </Badge>
                        )}
                        {user.location && (
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin size={14} />
                            {user.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>

              {user.bio && (
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {user.bio}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
