--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.5
-- Dumped by pg_dump version 9.6.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: soloproject; Type: DATABASE; Schema: -; Owner: martajopp
--

CREATE DATABASE soloproject WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE soloproject OWNER TO martajopp;

\connect soloproject

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: attendance; Type: TABLE; Schema: public; Owner: martajopp
--

CREATE TABLE attendance (
    "attId" integer NOT NULL,
    gymnast_id integer,
    date timestamp without time zone,
    status text DEFAULT 'N/A'::text
);


ALTER TABLE attendance OWNER TO martajopp;

--
-- Name: attendance_id_seq; Type: SEQUENCE; Schema: public; Owner: martajopp
--

CREATE SEQUENCE attendance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE attendance_id_seq OWNER TO martajopp;

--
-- Name: attendance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: martajopp
--

ALTER SEQUENCE attendance_id_seq OWNED BY attendance."attId";


--
-- Name: conversations; Type: TABLE; Schema: public; Owner: martajopp
--

CREATE TABLE conversations (
    conversation_id integer NOT NULL,
    subject character varying,
    to_user_id integer,
    from_user_id integer
);


ALTER TABLE conversations OWNER TO martajopp;

--
-- Name: conversations_conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: martajopp
--

CREATE SEQUENCE conversations_conversation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE conversations_conversation_id_seq OWNER TO martajopp;

--
-- Name: conversations_conversation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: martajopp
--

ALTER SEQUENCE conversations_conversation_id_seq OWNED BY conversations.conversation_id;


--
-- Name: gymnast_properties; Type: TABLE; Schema: public; Owner: martajopp
--

CREATE TABLE gymnast_properties (
    user_id integer NOT NULL,
    level integer NOT NULL
);


ALTER TABLE gymnast_properties OWNER TO martajopp;

--
-- Name: gymnast_properties_user_id_seq; Type: SEQUENCE; Schema: public; Owner: martajopp
--

CREATE SEQUENCE gymnast_properties_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE gymnast_properties_user_id_seq OWNER TO martajopp;

--
-- Name: gymnast_properties_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: martajopp
--

ALTER SEQUENCE gymnast_properties_user_id_seq OWNED BY gymnast_properties.user_id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: martajopp
--

CREATE TABLE messages (
    message_id integer NOT NULL,
    conversation_id integer,
    message character varying,
    to_user_id integer,
    from_user_id integer,
    date timestamp without time zone DEFAULT now() NOT NULL,
    from_name character varying(80),
    picture_url text,
    picture_filename text,
    read boolean DEFAULT false,
    "parentRead" boolean DEFAULT false
);


ALTER TABLE messages OWNER TO martajopp;

--
-- Name: messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: martajopp
--

CREATE SEQUENCE messages_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE messages_message_id_seq OWNER TO martajopp;

--
-- Name: messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: martajopp
--

ALTER SEQUENCE messages_message_id_seq OWNED BY messages.message_id;


--
-- Name: user_gymnast; Type: TABLE; Schema: public; Owner: martajopp
--

CREATE TABLE user_gymnast (
    parent_id integer,
    coach_id integer,
    gymnast_id integer NOT NULL
);


ALTER TABLE user_gymnast OWNER TO martajopp;

--
-- Name: users; Type: TABLE; Schema: public; Owner: martajopp
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(80),
    user_role character varying(80),
    username character varying(80) NOT NULL,
    password character varying(80) NOT NULL,
    profile character varying(200),
    gym_id character varying(80),
    coach_id integer,
    parent_id integer
);


ALTER TABLE users OWNER TO martajopp;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: martajopp
--

CREATE SEQUENCE users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_user_id_seq OWNER TO martajopp;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: martajopp
--

ALTER SEQUENCE users_user_id_seq OWNED BY users.id;


--
-- Name: attendance attId; Type: DEFAULT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY attendance ALTER COLUMN "attId" SET DEFAULT nextval('attendance_id_seq'::regclass);


--
-- Name: conversations conversation_id; Type: DEFAULT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY conversations ALTER COLUMN conversation_id SET DEFAULT nextval('conversations_conversation_id_seq'::regclass);


--
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY messages ALTER COLUMN message_id SET DEFAULT nextval('messages_message_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_user_id_seq'::regclass);


--
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY ("attId");


--
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (conversation_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- Name: user_gymnast user_gymnast_pk; Type: CONSTRAINT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY user_gymnast
    ADD CONSTRAINT user_gymnast_pk PRIMARY KEY (gymnast_id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: gymnast_properties_fk; Type: INDEX; Schema: public; Owner: martajopp
--

CREATE INDEX gymnast_properties_fk ON gymnast_properties USING btree (user_id);


--
-- Name: messages conversation_id; Type: FK CONSTRAINT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT conversation_id FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id);


--
-- Name: gymnast_properties gymnast_properties_fk0; Type: FK CONSTRAINT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY gymnast_properties
    ADD CONSTRAINT gymnast_properties_fk0 FOREIGN KEY (user_id) REFERENCES user_gymnast(gymnast_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_gymnast user_gymnast_fk2; Type: FK CONSTRAINT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY user_gymnast
    ADD CONSTRAINT user_gymnast_fk2 FOREIGN KEY (gymnast_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: attendance users_id; Type: FK CONSTRAINT; Schema: public; Owner: martajopp
--

ALTER TABLE ONLY attendance
    ADD CONSTRAINT users_id FOREIGN KEY (gymnast_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

