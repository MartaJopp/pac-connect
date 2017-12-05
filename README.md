# PAC Connect

PAC Connect is a communication application for the Parent, Athlete, Coach triangle geared specifically towards gymnastics.  It provides a layer of protection to the athlete by aligning with Safe Sport policy and sending copies of messages between the athlete and coach to the parent.  It also provides separation to the coach's personal accounts.

## Built With

PostgreSQL
Express
AngularJS
Node.js
Filestack
Moment.js
Angular-Carousel

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- PG


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Parents can send messages to the coach.
- [x] Athletes can send messages to the coach and a copy is sent to the parent.
- [x] Coaches can send messages to a parent or gymnast.  A copy of messages to the gymnast are sent to their 
      registered parent.
- [x] The ability to reply to a specific message.
- [x] Ability to send pictures via Filestack.
- [x] Attendance tracker for coaches.  Filter by name or date.
- [x] Parents and gymnasts can view their personal attendance.

### Next Steps

- [ ] Ability for coach to add meet results and parents/gymnasts to view their personal results.
- [ ] Charts.js to compare attendance to meets for parents/gymnasts.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Marta Jopp


## Acknowledgments

* Hat tip to anyone who's code was used
