# Content-Type

Let's create our first content type.

Imagine we want to build a small tool, which helps a company to store their upcoming and past events.

First we need to create a "content type". You can compare it to a model or database table, which stores your information.

Strapi creates and alters your table in the database automatically, so we just have to setup the content tupe through the UI.

Click on the left side on `Content-Types Builder` and then on `Create new collection type`:

<figure>
  <img src="/img/byot/content-type/01.png"/>
</figure>

Then we enter the name of the new content type `Event` for example:

<figure>
  <img src="/img/byot/content-type/02.png"/>
</figure>

We click on `Continue` and add a new Textfield to the model:

<figure>
  <img src="/img/byot/content-type/03.png"/>
</figure>

After that we enter "name" as name for the field and check the `Advanded Settings`, where we check `required field`.

<figure>
  <img src="/img/byot/content-type/04.png"/>
</figure>
<figure>
  <img src="/img/byot/content-type/05.png"/>
</figure>

Now we do that for description (optional Textfield), start (required DateTimefield), end (required DateTimefield).

<figure>
  <img src="/img/byot/content-type/06.png"/>
</figure>
<figure>
  <img src="/img/byot/content-type/07.png"/>
</figure>
<figure>
  <img src="/img/byot/content-type/08.png"/>
</figure>

After we created the fields we should see this model.

We press `Save` to let Strapi create the tables in the database.

<figure>
  <img src="/img/byot/content-type/09.png"/>
</figure>
<figure>
  <img src="/img/byot/content-type/10.png"/>
</figure>

On the left side under `Collection Types` should appear `Events`.

We click on `Events` and then on `Add New Event`:

<figure>
  <img src="/img/byot/content-type/11.png"/>
</figure>

Enter data for a new event and click on `Save`:

<figure>
  <img src="/img/byot/content-type/12.png"/>
</figure>

<figure>
  <img src="/img/byot/content-type/13.png"/>
</figure>
