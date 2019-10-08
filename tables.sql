create table greeted (
    id serial not null primary key,
    name text not null,
    language text not null
);

create table greetings (
    id serial not null primary key,
    languages text not null,
    mappings text  not null
);