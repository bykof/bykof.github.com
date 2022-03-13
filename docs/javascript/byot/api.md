# API

## Find

Now after we setup the Content-Type and the Roles & Permissions we are able to access the api:

```
http://localhost:1337/events
```

We will get a response like this:

```json
[
  {
    id: 1,
    name: "TechTalk #46 - BYOT - Build Your Own Tool mit Strapi und Next.js!",
    description: " "Schnell mal ein Tool bauen" ist für viele eine große Herausforderung. Es muss ein Backend mit Datenbankzugriff, REST-Schnittstellen, Benutzerverwaltung und vielen mehr entwickelt werden. Hinzu kommt, dass eine Oberfläche für das Eintragen und Anzeigen der Daten implementiert werden muss. Des Weiteren bleibt es meistens nicht bei der Verwaltung und Anzeige der Daten, denn es wird noch dazu ein Geschäftsprozess programmiert. Mit Strapi und Next.JS zeige ich anhand eines Live-Coding-Beispiels, wie ein Event-Verwaltungstool für interne Events eines Unternehmens in unter einer Stunde entwickelt werden kann.",
    start: "2020-10-02T15:00:00.000Z",
    end: "2020-10-02T18:00:00.000Z",
    created_by: {
      id: 1,
      firstname: "Test",
      lastname: "test",
      username: null
    },
    updated_by: {
      id: 1,
      firstname: "Test",
      lastname: "test",
      username: null
    },
    created_at: "2020-09-21T07:20:05.564Z",
    updated_at: "2020-09-21T07:20:05.573Z"
  }
]
```

## Find One

And we can directly access the event with the id:

```
http://localhost:1337/events/1
```

Response:

```json
{
  id: 1,
  name: "TechTalk #46 - BYOT - Build Your Own Tool mit Strapi und Next.js!",
  description: " "Schnell mal ein Tool bauen" ist für viele eine große Herausforderung. Es muss ein Backend mit Datenbankzugriff, REST-Schnittstellen, Benutzerverwaltung und vielen mehr entwickelt werden. Hinzu kommt, dass eine Oberfläche für das Eintragen und Anzeigen der Daten implementiert werden muss. Des Weiteren bleibt es meistens nicht bei der Verwaltung und Anzeige der Daten, denn es wird noch dazu ein Geschäftsprozess programmiert. Mit Strapi und Next.JS zeige ich anhand eines Live-Coding-Beispiels, wie ein Event-Verwaltungstool für interne Events eines Unternehmens in unter einer Stunde entwickelt werden kann.",
  start: "2020-10-02T15:00:00.000Z",
  end: "2020-10-02T18:00:00.000Z",
  created_by: {
    id: 1,
    firstname: "Test",
    lastname: "test",
    username: null
  },
  updated_by: {
    id: 1,
    firstname: "Test",
    lastname: "test",
    username: null
  },
  created_at: "2020-09-21T07:20:05.564Z",
  updated_at: "2020-09-21T07:20:05.573Z"
}
```
