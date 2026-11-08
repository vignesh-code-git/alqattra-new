--
-- PostgreSQL database dump
--

\restrict vWOpeuz8gitMI4cmhANmmbGSNf7IRxiOxnh0Mmtm6AnjNsZMl2UBKpj7KlTTHRk

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.salesman_truckstocktransaction DROP CONSTRAINT IF EXISTS salesman_truckstockt_truck_id_33060ad2_fk_salesman_;
ALTER TABLE IF EXISTS ONLY public.salesman_truck DROP CONSTRAINT IF EXISTS salesman_truck_driver_salesman_id_2ce6e1e6_fk_salesman_;
ALTER TABLE IF EXISTS ONLY public.salesman_commissionreport DROP CONSTRAINT IF EXISTS salesman_commissionr_salesman_id_46039a68_fk_salesman_;
ALTER TABLE IF EXISTS ONLY public.django_admin_log DROP CONSTRAINT IF EXISTS django_admin_log_user_id_c564eba6_fk_auth_user_id;
ALTER TABLE IF EXISTS ONLY public.django_admin_log DROP CONSTRAINT IF EXISTS django_admin_log_content_type_id_c4bce8eb_fk_django_co;
ALTER TABLE IF EXISTS ONLY public.customers_customerstatement DROP CONSTRAINT IF EXISTS customers_customerst_customer_id_311566ec_fk_customers;
ALTER TABLE IF EXISTS ONLY public.auth_user_user_permissions DROP CONSTRAINT IF EXISTS auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id;
ALTER TABLE IF EXISTS ONLY public.auth_user_user_permissions DROP CONSTRAINT IF EXISTS auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
ALTER TABLE IF EXISTS ONLY public.auth_user_groups DROP CONSTRAINT IF EXISTS auth_user_groups_user_id_6a12ed8b_fk_auth_user_id;
ALTER TABLE IF EXISTS ONLY public.auth_user_groups DROP CONSTRAINT IF EXISTS auth_user_groups_group_id_97559544_fk_auth_group_id;
ALTER TABLE IF EXISTS ONLY public.auth_permission DROP CONSTRAINT IF EXISTS auth_permission_content_type_id_2f476e4b_fk_django_co;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
ALTER TABLE IF EXISTS ONLY public.alqattara_walletrecharge DROP CONSTRAINT IF EXISTS alqattara_walletrech_wallet_id_3ff72392_fk_alqattara;
ALTER TABLE IF EXISTS ONLY public.alqattara_wallet DROP CONSTRAINT IF EXISTS alqattara_wallet_customer_id_cf168d79_fk_customers_customer_id;
ALTER TABLE IF EXISTS ONLY public.alqattara_storeinventory DROP CONSTRAINT IF EXISTS alqattara_storeinven_product_id_2fd4b534_fk_alqattara;
ALTER TABLE IF EXISTS ONLY public.alqattara_route DROP CONSTRAINT IF EXISTS alqattara_route_zone_id_417ddfb7_fk_alqattara_zone_id;
ALTER TABLE IF EXISTS ONLY public.alqattara_route DROP CONSTRAINT IF EXISTS alqattara_route_driver_salesman_id_57805a10_fk_salesman_;
ALTER TABLE IF EXISTS ONLY public.alqattara_orderitem DROP CONSTRAINT IF EXISTS alqattara_orderitem_product_id_20cf8992_fk_alqattara_product_id;
ALTER TABLE IF EXISTS ONLY public.alqattara_orderitem DROP CONSTRAINT IF EXISTS alqattara_orderitem_order_id_d5e1ec02_fk_alqattara_order_id;
ALTER TABLE IF EXISTS ONLY public.alqattara_order DROP CONSTRAINT IF EXISTS alqattara_order_salesman_id_b36b2f7f_fk_salesman_salesman_id;
ALTER TABLE IF EXISTS ONLY public.alqattara_order DROP CONSTRAINT IF EXISTS alqattara_order_customer_id_e93f8d4f_fk_customers_customer_id;
ALTER TABLE IF EXISTS ONLY public.alqattara_invoice DROP CONSTRAINT IF EXISTS alqattara_invoice_order_id_2f7b4c41_fk_alqattara_order_id;
ALTER TABLE IF EXISTS ONLY public.alqattara_invoice DROP CONSTRAINT IF EXISTS alqattara_invoice_customer_id_a0e182e9_fk_customers_customer_id;
ALTER TABLE IF EXISTS ONLY public.alqattara_cashiertransaction DROP CONSTRAINT IF EXISTS alqattara_cashiertra_salesman_id_c97c0b21_fk_salesman_;
ALTER TABLE IF EXISTS ONLY public.alqattara_cashiertransaction DROP CONSTRAINT IF EXISTS alqattara_cashiertra_customer_id_0ff91496_fk_customers;
DROP INDEX IF EXISTS public.salesman_truckstocktransaction_truck_id_33060ad2;
DROP INDEX IF EXISTS public.salesman_truck_plate_no_ec57f6b5_like;
DROP INDEX IF EXISTS public.salesman_truck_driver_salesman_id_2ce6e1e6;
DROP INDEX IF EXISTS public.salesman_salesman_salesman_code_d920601a_like;
DROP INDEX IF EXISTS public.salesman_commissionreport_salesman_id_46039a68;
DROP INDEX IF EXISTS public.django_session_session_key_c0390e0f_like;
DROP INDEX IF EXISTS public.django_session_expire_date_a5c62663;
DROP INDEX IF EXISTS public.django_admin_log_user_id_c564eba6;
DROP INDEX IF EXISTS public.django_admin_log_content_type_id_c4bce8eb;
DROP INDEX IF EXISTS public.customers_customerstatement_customer_id_311566ec;
DROP INDEX IF EXISTS public.customers_customer_customer_code_8e82a7cf_like;
DROP INDEX IF EXISTS public.auth_user_username_6821ab7c_like;
DROP INDEX IF EXISTS public.auth_user_user_permissions_user_id_a95ead1b;
DROP INDEX IF EXISTS public.auth_user_user_permissions_permission_id_1fbb5f2c;
DROP INDEX IF EXISTS public.auth_user_groups_user_id_6a12ed8b;
DROP INDEX IF EXISTS public.auth_user_groups_group_id_97559544;
DROP INDEX IF EXISTS public.auth_permission_content_type_id_2f476e4b;
DROP INDEX IF EXISTS public.auth_group_permissions_permission_id_84c5c92e;
DROP INDEX IF EXISTS public.auth_group_permissions_group_id_b120cbf9;
DROP INDEX IF EXISTS public.auth_group_name_a6ea08ec_like;
DROP INDEX IF EXISTS public.alqattara_zone_code_f02ccd94_like;
DROP INDEX IF EXISTS public.alqattara_walletrecharge_wallet_id_3ff72392;
DROP INDEX IF EXISTS public.alqattara_storeinventory_product_id_2fd4b534;
DROP INDEX IF EXISTS public.alqattara_route_zone_id_417ddfb7;
DROP INDEX IF EXISTS public.alqattara_route_driver_salesman_id_57805a10;
DROP INDEX IF EXISTS public.alqattara_route_code_446f40ca_like;
DROP INDEX IF EXISTS public.alqattara_product_code_cc86ed20_like;
DROP INDEX IF EXISTS public.alqattara_orderitem_product_id_20cf8992;
DROP INDEX IF EXISTS public.alqattara_orderitem_order_id_d5e1ec02;
DROP INDEX IF EXISTS public.alqattara_order_salesman_id_b36b2f7f;
DROP INDEX IF EXISTS public.alqattara_order_order_no_2d3254a0_like;
DROP INDEX IF EXISTS public.alqattara_order_customer_id_e93f8d4f;
DROP INDEX IF EXISTS public.alqattara_invoice_order_id_2f7b4c41;
DROP INDEX IF EXISTS public.alqattara_invoice_invoice_no_577d45ce_like;
DROP INDEX IF EXISTS public.alqattara_invoice_customer_id_a0e182e9;
DROP INDEX IF EXISTS public.alqattara_cashiertransaction_transaction_no_b8498ad8_like;
DROP INDEX IF EXISTS public.alqattara_cashiertransaction_salesman_id_c97c0b21;
DROP INDEX IF EXISTS public.alqattara_cashiertransaction_customer_id_0ff91496;
ALTER TABLE IF EXISTS ONLY public.salesman_truckstocktransaction DROP CONSTRAINT IF EXISTS salesman_truckstocktransaction_pkey;
ALTER TABLE IF EXISTS ONLY public.salesman_truck DROP CONSTRAINT IF EXISTS salesman_truck_plate_no_key;
ALTER TABLE IF EXISTS ONLY public.salesman_truck DROP CONSTRAINT IF EXISTS salesman_truck_pkey;
ALTER TABLE IF EXISTS ONLY public.salesman_salesman DROP CONSTRAINT IF EXISTS salesman_salesman_salesman_code_key;
ALTER TABLE IF EXISTS ONLY public.salesman_salesman DROP CONSTRAINT IF EXISTS salesman_salesman_pkey;
ALTER TABLE IF EXISTS ONLY public.salesman_commissionreport DROP CONSTRAINT IF EXISTS salesman_commissionreport_pkey;
ALTER TABLE IF EXISTS ONLY public.django_session DROP CONSTRAINT IF EXISTS django_session_pkey;
ALTER TABLE IF EXISTS ONLY public.django_migrations DROP CONSTRAINT IF EXISTS django_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public.django_content_type DROP CONSTRAINT IF EXISTS django_content_type_pkey;
ALTER TABLE IF EXISTS ONLY public.django_content_type DROP CONSTRAINT IF EXISTS django_content_type_app_label_model_76bd3d3b_uniq;
ALTER TABLE IF EXISTS ONLY public.django_admin_log DROP CONSTRAINT IF EXISTS django_admin_log_pkey;
ALTER TABLE IF EXISTS ONLY public.customers_customerstatement DROP CONSTRAINT IF EXISTS customers_customerstatement_pkey;
ALTER TABLE IF EXISTS ONLY public.customers_customer DROP CONSTRAINT IF EXISTS customers_customer_pkey;
ALTER TABLE IF EXISTS ONLY public.customers_customer DROP CONSTRAINT IF EXISTS customers_customer_customer_code_key;
ALTER TABLE IF EXISTS ONLY public.auth_user DROP CONSTRAINT IF EXISTS auth_user_username_key;
ALTER TABLE IF EXISTS ONLY public.auth_user_user_permissions DROP CONSTRAINT IF EXISTS auth_user_user_permissions_user_id_permission_id_14a6b632_uniq;
ALTER TABLE IF EXISTS ONLY public.auth_user_user_permissions DROP CONSTRAINT IF EXISTS auth_user_user_permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_user DROP CONSTRAINT IF EXISTS auth_user_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_user_groups DROP CONSTRAINT IF EXISTS auth_user_groups_user_id_group_id_94350c0c_uniq;
ALTER TABLE IF EXISTS ONLY public.auth_user_groups DROP CONSTRAINT IF EXISTS auth_user_groups_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_permission DROP CONSTRAINT IF EXISTS auth_permission_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_permission DROP CONSTRAINT IF EXISTS auth_permission_content_type_id_codename_01ab375a_uniq;
ALTER TABLE IF EXISTS ONLY public.auth_group DROP CONSTRAINT IF EXISTS auth_group_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
ALTER TABLE IF EXISTS ONLY public.auth_group DROP CONSTRAINT IF EXISTS auth_group_name_key;
ALTER TABLE IF EXISTS ONLY public.alqattara_zone DROP CONSTRAINT IF EXISTS alqattara_zone_pkey;
ALTER TABLE IF EXISTS ONLY public.alqattara_zone DROP CONSTRAINT IF EXISTS alqattara_zone_code_key;
ALTER TABLE IF EXISTS ONLY public.alqattara_walletrecharge DROP CONSTRAINT IF EXISTS alqattara_walletrecharge_pkey;
ALTER TABLE IF EXISTS ONLY public.alqattara_wallet DROP CONSTRAINT IF EXISTS alqattara_wallet_pkey;
ALTER TABLE IF EXISTS ONLY public.alqattara_wallet DROP CONSTRAINT IF EXISTS alqattara_wallet_customer_id_key;
ALTER TABLE IF EXISTS ONLY public.alqattara_storeinventory DROP CONSTRAINT IF EXISTS alqattara_storeinventory_pkey;
ALTER TABLE IF EXISTS ONLY public.alqattara_route DROP CONSTRAINT IF EXISTS alqattara_route_pkey;
ALTER TABLE IF EXISTS ONLY public.alqattara_route DROP CONSTRAINT IF EXISTS alqattara_route_code_key;
ALTER TABLE IF EXISTS ONLY public.alqattara_product DROP CONSTRAINT IF EXISTS alqattara_product_pkey;
ALTER TABLE IF EXISTS ONLY public.alqattara_product DROP CONSTRAINT IF EXISTS alqattara_product_code_key;
ALTER TABLE IF EXISTS ONLY public.alqattara_orderitem DROP CONSTRAINT IF EXISTS alqattara_orderitem_pkey;
ALTER TABLE IF EXISTS ONLY public.alqattara_order DROP CONSTRAINT IF EXISTS alqattara_order_pkey;
ALTER TABLE IF EXISTS ONLY public.alqattara_order DROP CONSTRAINT IF EXISTS alqattara_order_order_no_key;
ALTER TABLE IF EXISTS ONLY public.alqattara_masteritem DROP CONSTRAINT IF EXISTS alqattara_masteritem_pkey;
ALTER TABLE IF EXISTS ONLY public.alqattara_invoice DROP CONSTRAINT IF EXISTS alqattara_invoice_pkey;
ALTER TABLE IF EXISTS ONLY public.alqattara_invoice DROP CONSTRAINT IF EXISTS alqattara_invoice_invoice_no_key;
ALTER TABLE IF EXISTS ONLY public.alqattara_cashiertransaction DROP CONSTRAINT IF EXISTS alqattara_cashiertransaction_transaction_no_key;
ALTER TABLE IF EXISTS ONLY public.alqattara_cashiertransaction DROP CONSTRAINT IF EXISTS alqattara_cashiertransaction_pkey;
DROP TABLE IF EXISTS public.salesman_truckstocktransaction;
DROP TABLE IF EXISTS public.salesman_truck;
DROP TABLE IF EXISTS public.salesman_salesman;
DROP TABLE IF EXISTS public.salesman_commissionreport;
DROP TABLE IF EXISTS public.django_session;
DROP TABLE IF EXISTS public.django_migrations;
DROP TABLE IF EXISTS public.django_content_type;
DROP TABLE IF EXISTS public.django_admin_log;
DROP TABLE IF EXISTS public.customers_customerstatement;
DROP TABLE IF EXISTS public.customers_customer;
DROP TABLE IF EXISTS public.auth_user_user_permissions;
DROP TABLE IF EXISTS public.auth_user_groups;
DROP TABLE IF EXISTS public.auth_user;
DROP TABLE IF EXISTS public.auth_permission;
DROP TABLE IF EXISTS public.auth_group_permissions;
DROP TABLE IF EXISTS public.auth_group;
DROP TABLE IF EXISTS public.alqattara_zone;
DROP TABLE IF EXISTS public.alqattara_walletrecharge;
DROP TABLE IF EXISTS public.alqattara_wallet;
DROP TABLE IF EXISTS public.alqattara_storeinventory;
DROP TABLE IF EXISTS public.alqattara_route;
DROP TABLE IF EXISTS public.alqattara_product;
DROP TABLE IF EXISTS public.alqattara_orderitem;
DROP TABLE IF EXISTS public.alqattara_order;
DROP TABLE IF EXISTS public.alqattara_masteritem;
DROP TABLE IF EXISTS public.alqattara_invoice;
DROP TABLE IF EXISTS public.alqattara_cashiertransaction;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alqattara_cashiertransaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alqattara_cashiertransaction (
    id bigint NOT NULL,
    transaction_no character varying(50) NOT NULL,
    amount numeric(12,2) NOT NULL,
    payment_type character varying(30) NOT NULL,
    payment_method character varying(20) NOT NULL,
    reference_note character varying(255),
    created_at timestamp with time zone NOT NULL,
    customer_id bigint,
    salesman_id bigint
);


--
-- Name: alqattara_cashiertransaction_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.alqattara_cashiertransaction ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.alqattara_cashiertransaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: alqattara_invoice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alqattara_invoice (
    id bigint NOT NULL,
    invoice_no character varying(50) NOT NULL,
    invoice_date date NOT NULL,
    due_date date NOT NULL,
    subtotal numeric(12,2) NOT NULL,
    tax_amount numeric(12,2) NOT NULL,
    total_amount numeric(12,2) NOT NULL,
    paid_amount numeric(12,2) NOT NULL,
    status character varying(20) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    customer_id bigint NOT NULL,
    order_id bigint
);


--
-- Name: alqattara_invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.alqattara_invoice ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.alqattara_invoice_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: alqattara_masteritem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alqattara_masteritem (
    id bigint NOT NULL,
    category character varying(100) NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    is_active boolean NOT NULL
);


--
-- Name: alqattara_masteritem_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.alqattara_masteritem ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.alqattara_masteritem_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: alqattara_order; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alqattara_order (
    id bigint NOT NULL,
    order_no character varying(50) NOT NULL,
    order_date date NOT NULL,
    delivery_date date,
    status character varying(30) NOT NULL,
    total_amount numeric(12,2) NOT NULL,
    payment_method character varying(20) NOT NULL,
    payment_status character varying(20) NOT NULL,
    route character varying(100),
    city character varying(50) NOT NULL,
    notes text,
    created_at timestamp with time zone NOT NULL,
    customer_id bigint NOT NULL,
    salesman_id bigint
);


--
-- Name: alqattara_order_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.alqattara_order ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.alqattara_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: alqattara_orderitem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alqattara_orderitem (
    id bigint NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    total_price numeric(12,2) NOT NULL,
    order_id bigint NOT NULL,
    product_id bigint NOT NULL
);


--
-- Name: alqattara_orderitem_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.alqattara_orderitem ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.alqattara_orderitem_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: alqattara_product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alqattara_product (
    id bigint NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(255) NOT NULL,
    category character varying(100) NOT NULL,
    unit character varying(50) NOT NULL,
    cost_price numeric(10,2) NOT NULL,
    selling_price numeric(10,2) NOT NULL,
    stock_quantity integer NOT NULL,
    min_stock integer NOT NULL,
    is_active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL
);


--
-- Name: alqattara_product_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.alqattara_product ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.alqattara_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: alqattara_route; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alqattara_route (
    id bigint NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    is_active boolean NOT NULL,
    driver_salesman_id bigint,
    zone_id bigint NOT NULL
);


--
-- Name: alqattara_route_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.alqattara_route ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.alqattara_route_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: alqattara_storeinventory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alqattara_storeinventory (
    id bigint NOT NULL,
    batch_no character varying(100),
    quantity_in integer NOT NULL,
    quantity_out integer NOT NULL,
    balance integer NOT NULL,
    location character varying(100) NOT NULL,
    remarks text,
    updated_at timestamp with time zone NOT NULL,
    product_id bigint NOT NULL
);


--
-- Name: alqattara_storeinventory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.alqattara_storeinventory ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.alqattara_storeinventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: alqattara_wallet; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alqattara_wallet (
    id bigint NOT NULL,
    balance numeric(12,2) NOT NULL,
    reward_points integer NOT NULL,
    is_active boolean NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    customer_id bigint NOT NULL
);


--
-- Name: alqattara_wallet_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.alqattara_wallet ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.alqattara_wallet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: alqattara_walletrecharge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alqattara_walletrecharge (
    id bigint NOT NULL,
    amount numeric(10,2) NOT NULL,
    bonus numeric(10,2) NOT NULL,
    payment_method character varying(20) NOT NULL,
    transaction_ref character varying(100),
    created_at timestamp with time zone NOT NULL,
    wallet_id bigint NOT NULL
);


--
-- Name: alqattara_walletrecharge_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.alqattara_walletrecharge ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.alqattara_walletrecharge_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: alqattara_zone; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alqattara_zone (
    id bigint NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    city character varying(50) NOT NULL,
    is_active boolean NOT NULL
);


--
-- Name: alqattara_zone_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.alqattara_zone ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.alqattara_zone_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_group ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_group_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_user_groups (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_user_groups ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_user ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_user_user_permissions (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: customers_customer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers_customer (
    id bigint NOT NULL,
    customer_code character varying(50) NOT NULL,
    name character varying(255) NOT NULL,
    customer_type character varying(50) NOT NULL,
    phone character varying(50) NOT NULL,
    email character varying(254),
    city character varying(50) NOT NULL,
    zone character varying(100),
    route character varying(100),
    address text,
    credit_limit numeric(12,2) NOT NULL,
    current_balance numeric(12,2) NOT NULL,
    status character varying(20) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


--
-- Name: customers_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.customers_customer ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.customers_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: customers_customerstatement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers_customerstatement (
    id bigint NOT NULL,
    date date NOT NULL,
    description character varying(255) NOT NULL,
    reference_no character varying(100),
    debit numeric(12,2) NOT NULL,
    credit numeric(12,2) NOT NULL,
    balance numeric(12,2) NOT NULL,
    customer_id bigint NOT NULL
);


--
-- Name: customers_customerstatement_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.customers_customerstatement ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.customers_customerstatement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_admin_log ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_content_type ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_migrations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


--
-- Name: salesman_commissionreport; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.salesman_commissionreport (
    id bigint NOT NULL,
    period character varying(50) NOT NULL,
    total_sales numeric(12,2) NOT NULL,
    commission_amount numeric(12,2) NOT NULL,
    status character varying(30) NOT NULL,
    salesman_id bigint NOT NULL
);


--
-- Name: salesman_commissionreport_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.salesman_commissionreport ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.salesman_commissionreport_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: salesman_salesman; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.salesman_salesman (
    id bigint NOT NULL,
    salesman_code character varying(50) NOT NULL,
    name character varying(255) NOT NULL,
    mobile character varying(50) NOT NULL,
    email character varying(254),
    city character varying(50) NOT NULL,
    assigned_route character varying(100),
    commission_rate numeric(5,2) NOT NULL,
    is_active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL
);


--
-- Name: salesman_salesman_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.salesman_salesman ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.salesman_salesman_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: salesman_truck; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.salesman_truck (
    id bigint NOT NULL,
    plate_no character varying(50) NOT NULL,
    truck_name character varying(100) NOT NULL,
    model character varying(100),
    capacity_5gal integer NOT NULL,
    route character varying(100),
    status character varying(30) NOT NULL,
    last_service_date date,
    driver_salesman_id bigint
);


--
-- Name: salesman_truck_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.salesman_truck ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.salesman_truck_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: salesman_truckstocktransaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.salesman_truckstocktransaction (
    id bigint NOT NULL,
    transaction_type character varying(30) NOT NULL,
    product_name character varying(150) NOT NULL,
    quantity integer NOT NULL,
    transferred_by character varying(150) NOT NULL,
    date timestamp with time zone NOT NULL,
    truck_id bigint NOT NULL
);


--
-- Name: salesman_truckstocktransaction_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.salesman_truckstocktransaction ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.salesman_truckstocktransaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: alqattara_cashiertransaction; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alqattara_cashiertransaction (id, transaction_no, amount, payment_type, payment_method, reference_note, created_at, customer_id, salesman_id) FROM stdin;
1	TXN-2026-0891	18613.24	Collection	Cash	Daily driver route collection settlement	2026-11-08 14:52:05.83488+05:30	1	1
\.


--
-- Data for Name: alqattara_invoice; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alqattara_invoice (id, invoice_no, invoice_date, due_date, subtotal, tax_amount, total_amount, paid_amount, status, created_at, customer_id, order_id) FROM stdin;
1	INV-2026-0045	2026-11-08	2026-12-08	1125.00	56.25	1181.25	0.00	Sent	2026-11-08 14:52:05.825678+05:30	1	1
\.


--
-- Data for Name: alqattara_masteritem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alqattara_masteritem (id, category, code, name, description, is_active) FROM stdin;
\.


--
-- Data for Name: alqattara_order; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alqattara_order (id, order_no, order_date, delivery_date, status, total_amount, payment_method, payment_status, route, city, notes, created_at, customer_id, salesman_id) FROM stdin;
1	ORD-2026-1001	2026-11-08	2026-11-08	Delivered	1125.00	Credit	Unpaid	Route AA-01	AL AIN	\N	2026-11-08 14:52:05.811855+05:30	1	1
\.


--
-- Data for Name: alqattara_orderitem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alqattara_orderitem (id, quantity, unit_price, total_price, order_id, product_id) FROM stdin;
1	150	7.50	1125.00	1	1
\.


--
-- Data for Name: alqattara_product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alqattara_product (id, code, name, category, unit, cost_price, selling_price, stock_quantity, min_stock, is_active, created_at) FROM stdin;
1	PRD-5GAL	5 Gallon Drinking Water	Water 5 Gallon	Bottle	3.50	7.50	4677	200	t	2026-11-08 14:52:05.776823+05:30
2	PRD-500ML	500ml PET Bottles (Pack of 24)	Bottled Water (PET)	Carton	10.00	16.00	520	50	t	2026-11-08 14:52:05.780033+05:30
3	PRD-EMPTY-BTL	Empty 5 Gallon Polycarbonate Bottle	Accessories & Coolers	Piece	12.00	25.00	310	30	t	2026-11-08 14:52:05.78154+05:30
4	PRD-COOLER	Hot & Cold Water Dispenser Cooler	Dispensers	Unit	220.00	380.00	45	10	t	2026-11-08 14:52:05.783741+05:30
\.


--
-- Data for Name: alqattara_route; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alqattara_route (id, code, name, is_active, driver_salesman_id, zone_id) FROM stdin;
1	RT-AA-01	Route AA-01 Al Jimi	t	1	1
2	RT-AD-02	Route AD-02 Al Khalidiyah	t	2	2
\.


--
-- Data for Name: alqattara_storeinventory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alqattara_storeinventory (id, batch_no, quantity_in, quantity_out, balance, location, remarks, updated_at, product_id) FROM stdin;
1	BATCH-2026-001	5000	323	4677	Al Ain Main Plant Warehouse	\N	2026-11-08 14:52:05.787813+05:30	1
\.


--
-- Data for Name: alqattara_wallet; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alqattara_wallet (id, balance, reward_points, is_active, updated_at, customer_id) FROM stdin;
1	1250.00	450	t	2026-11-08 14:52:05.802488+05:30	1
\.


--
-- Data for Name: alqattara_walletrecharge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alqattara_walletrecharge (id, amount, bonus, payment_method, transaction_ref, created_at, wallet_id) FROM stdin;
\.


--
-- Data for Name: alqattara_zone; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alqattara_zone (id, code, name, city, is_active) FROM stdin;
1	ZN-AA-01	Al Ain Central	AL AIN	t
2	ZN-AD-01	Abu Dhabi Corniche	ABU DHABI	t
3	ZN-DXB-01	Dubai Downtown	DUBAI	t
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	3	add_permission
6	Can change permission	3	change_permission
7	Can delete permission	3	delete_permission
8	Can view permission	3	view_permission
9	Can add group	2	add_group
10	Can change group	2	change_group
11	Can delete group	2	delete_group
12	Can view group	2	view_group
13	Can add user	4	add_user
14	Can change user	4	change_user
15	Can delete user	4	delete_user
16	Can view user	4	view_user
17	Can add content type	5	add_contenttype
18	Can change content type	5	change_contenttype
19	Can delete content type	5	delete_contenttype
20	Can view content type	5	view_contenttype
21	Can add session	6	add_session
22	Can change session	6	change_session
23	Can delete session	6	delete_session
24	Can view session	6	view_session
25	Can add master item	9	add_masteritem
26	Can change master item	9	change_masteritem
27	Can delete master item	9	delete_masteritem
28	Can view master item	9	view_masteritem
29	Can add product	12	add_product
30	Can change product	12	change_product
31	Can delete product	12	delete_product
32	Can view product	12	view_product
33	Can add zone	17	add_zone
34	Can change zone	17	change_zone
35	Can delete zone	17	delete_zone
36	Can view zone	17	view_zone
37	Can add cashier transaction	7	add_cashiertransaction
38	Can change cashier transaction	7	change_cashiertransaction
39	Can delete cashier transaction	7	delete_cashiertransaction
40	Can view cashier transaction	7	view_cashiertransaction
41	Can add order	10	add_order
42	Can change order	10	change_order
43	Can delete order	10	delete_order
44	Can view order	10	view_order
45	Can add invoice	8	add_invoice
46	Can change invoice	8	change_invoice
47	Can delete invoice	8	delete_invoice
48	Can view invoice	8	view_invoice
49	Can add order item	11	add_orderitem
50	Can change order item	11	change_orderitem
51	Can delete order item	11	delete_orderitem
52	Can view order item	11	view_orderitem
53	Can add store inventory	14	add_storeinventory
54	Can change store inventory	14	change_storeinventory
55	Can delete store inventory	14	delete_storeinventory
56	Can view store inventory	14	view_storeinventory
57	Can add wallet	15	add_wallet
58	Can change wallet	15	change_wallet
59	Can delete wallet	15	delete_wallet
60	Can view wallet	15	view_wallet
61	Can add wallet recharge	16	add_walletrecharge
62	Can change wallet recharge	16	change_walletrecharge
63	Can delete wallet recharge	16	delete_walletrecharge
64	Can view wallet recharge	16	view_walletrecharge
65	Can add route	13	add_route
66	Can change route	13	change_route
67	Can delete route	13	delete_route
68	Can view route	13	view_route
69	Can add salesman	19	add_salesman
70	Can change salesman	19	change_salesman
71	Can delete salesman	19	delete_salesman
72	Can view salesman	19	view_salesman
73	Can add commission report	18	add_commissionreport
74	Can change commission report	18	change_commissionreport
75	Can delete commission report	18	delete_commissionreport
76	Can view commission report	18	view_commissionreport
77	Can add truck	20	add_truck
78	Can change truck	20	change_truck
79	Can delete truck	20	delete_truck
80	Can view truck	20	view_truck
81	Can add truck stock transaction	21	add_truckstocktransaction
82	Can change truck stock transaction	21	change_truckstocktransaction
83	Can delete truck stock transaction	21	delete_truckstocktransaction
84	Can view truck stock transaction	21	view_truckstocktransaction
85	Can add customer	22	add_customer
86	Can change customer	22	change_customer
87	Can delete customer	22	delete_customer
88	Can view customer	22	view_customer
89	Can add customer statement	23	add_customerstatement
90	Can change customer statement	23	change_customerstatement
91	Can delete customer statement	23	delete_customerstatement
92	Can view customer statement	23	view_customerstatement
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$1500000$J9groM9ieLSC90wDB6yyj8$5d19WFwIf6pvFCmgi0pVZoSAG4FPU0wtaa4QHS80c4M=	\N	t	admin			admin@alqattara.ae	t	t	2026-11-08 14:52:05.015934+05:30
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: customers_customer; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers_customer (id, customer_code, name, customer_type, phone, email, city, zone, route, address, credit_limit, current_balance, status, created_at, updated_at) FROM stdin;
1	CUST-AA-001	Al Ain Palace Hotel	Corporate	+971 3 763 1000	procurement@alainpalace.ae	AL AIN	Al Ain Central	Route AA-01	Al Jimi, Sector 4, Building 12	25000.00	5180.96	Active	2026-11-08 14:52:05.793174+05:30	2026-11-08 14:52:05.793174+05:30
2	CUST-AD-002	Emirates Steel Staff Quarters	Corporate	+971 2 550 4400	supplies@emiratessteel.ae	ABU DHABI	Abu Dhabi Corniche	Route AD-02	Musaffah ICAD 1	50000.00	18450.00	Active	2026-11-08 14:52:05.796577+05:30	2026-11-08 17:03:08.912381+05:30
5	SAMPLE-001	Sample CUSTOMER NAME	Corporate	+971 50 123 4567	import@alqattara.ae	AL AIN	Al Ain Central	Route AA-01	\N	5000.00	0.00	Deleted	2026-11-08 17:02:23.479281+05:30	2026-11-08 19:30:40.049279+05:30
\.


--
-- Data for Name: customers_customerstatement; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers_customerstatement (id, date, description, reference_no, debit, credit, balance, customer_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	group
3	auth	permission
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	alqattara	cashiertransaction
8	alqattara	invoice
9	alqattara	masteritem
10	alqattara	order
11	alqattara	orderitem
12	alqattara	product
13	alqattara	route
14	alqattara	storeinventory
15	alqattara	wallet
16	alqattara	walletrecharge
17	alqattara	zone
18	salesman	commissionreport
19	salesman	salesman
20	salesman	truck
21	salesman	truckstocktransaction
22	customers	customer
23	customers	customerstatement
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2026-11-08 14:51:56.940503+05:30
2	auth	0001_initial	2026-11-08 14:51:57.021206+05:30
3	admin	0001_initial	2026-11-08 14:51:57.044419+05:30
4	admin	0002_logentry_remove_auto_add	2026-11-08 14:51:57.049719+05:30
5	admin	0003_logentry_add_action_flag_choices	2026-11-08 14:51:57.054553+05:30
6	salesman	0001_initial	2026-11-08 14:51:57.098854+05:30
7	customers	0001_initial	2026-11-08 14:51:57.120264+05:30
8	alqattara	0001_initial	2026-11-08 14:51:57.277369+05:30
9	contenttypes	0002_remove_content_type_name	2026-11-08 14:51:57.30222+05:30
10	auth	0002_alter_permission_name_max_length	2026-11-08 14:51:57.30685+05:30
11	auth	0003_alter_user_email_max_length	2026-11-08 14:51:57.313351+05:30
12	auth	0004_alter_user_username_opts	2026-11-08 14:51:57.317659+05:30
13	auth	0005_alter_user_last_login_null	2026-11-08 14:51:57.321953+05:30
14	auth	0006_require_contenttypes_0002	2026-11-08 14:51:57.323002+05:30
15	auth	0007_alter_validators_add_error_messages	2026-11-08 14:51:57.330805+05:30
16	auth	0008_alter_user_username_max_length	2026-11-08 14:51:57.340821+05:30
17	auth	0009_alter_user_last_name_max_length	2026-11-08 14:51:57.347851+05:30
18	auth	0010_alter_group_name_max_length	2026-11-08 14:51:57.353532+05:30
19	auth	0011_update_proxy_permissions	2026-11-08 14:51:57.366062+05:30
20	auth	0012_alter_user_first_name_max_length	2026-11-08 14:51:57.371508+05:30
21	sessions	0001_initial	2026-11-08 14:51:57.381449+05:30
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Data for Name: salesman_commissionreport; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.salesman_commissionreport (id, period, total_sales, commission_amount, status, salesman_id) FROM stdin;
\.


--
-- Data for Name: salesman_salesman; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.salesman_salesman (id, salesman_code, name, mobile, email, city, assigned_route, commission_rate, is_active, created_at) FROM stdin;
1	SM-101	Mohammed Rashid	+971 50 123 4567	rashid@alqattara.ae	AL AIN	Route AA-01	5.00	t	2026-11-08 14:52:05.749051+05:30
2	SM-102	Ahmed Al Mansoori	+971 55 987 6543	ahmed@alqattara.ae	ABU DHABI	Route AD-02	5.00	t	2026-11-08 14:52:05.753621+05:30
\.


--
-- Data for Name: salesman_truck; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.salesman_truck (id, plate_no, truck_name, model, capacity_5gal, route, status, last_service_date, driver_salesman_id) FROM stdin;
1	DXB-78901	Isuzu NPR 4-Ton	2024	350	Route AA-01	Active	\N	1
2	AA-45210	Mitsubishi Canter	2023	300	Route AD-02	Active	\N	2
\.


--
-- Data for Name: salesman_truckstocktransaction; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.salesman_truckstocktransaction (id, transaction_type, product_name, quantity, transferred_by, date, truck_id) FROM stdin;
\.


--
-- Name: alqattara_cashiertransaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alqattara_cashiertransaction_id_seq', 1, true);


--
-- Name: alqattara_invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alqattara_invoice_id_seq', 1, true);


--
-- Name: alqattara_masteritem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alqattara_masteritem_id_seq', 1, false);


--
-- Name: alqattara_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alqattara_order_id_seq', 1, true);


--
-- Name: alqattara_orderitem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alqattara_orderitem_id_seq', 1, true);


--
-- Name: alqattara_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alqattara_product_id_seq', 4, true);


--
-- Name: alqattara_route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alqattara_route_id_seq', 2, true);


--
-- Name: alqattara_storeinventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alqattara_storeinventory_id_seq', 1, true);


--
-- Name: alqattara_wallet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alqattara_wallet_id_seq', 2, true);


--
-- Name: alqattara_walletrecharge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alqattara_walletrecharge_id_seq', 1, false);


--
-- Name: alqattara_zone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alqattara_zone_id_seq', 3, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 92, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: customers_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customers_customer_id_seq', 5, true);


--
-- Name: customers_customerstatement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customers_customerstatement_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 23, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 21, true);


--
-- Name: salesman_commissionreport_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.salesman_commissionreport_id_seq', 1, false);


--
-- Name: salesman_salesman_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.salesman_salesman_id_seq', 2, true);


--
-- Name: salesman_truck_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.salesman_truck_id_seq', 2, true);


--
-- Name: salesman_truckstocktransaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.salesman_truckstocktransaction_id_seq', 1, false);


--
-- Name: alqattara_cashiertransaction alqattara_cashiertransaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_cashiertransaction
    ADD CONSTRAINT alqattara_cashiertransaction_pkey PRIMARY KEY (id);


--
-- Name: alqattara_cashiertransaction alqattara_cashiertransaction_transaction_no_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_cashiertransaction
    ADD CONSTRAINT alqattara_cashiertransaction_transaction_no_key UNIQUE (transaction_no);


--
-- Name: alqattara_invoice alqattara_invoice_invoice_no_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_invoice
    ADD CONSTRAINT alqattara_invoice_invoice_no_key UNIQUE (invoice_no);


--
-- Name: alqattara_invoice alqattara_invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_invoice
    ADD CONSTRAINT alqattara_invoice_pkey PRIMARY KEY (id);


--
-- Name: alqattara_masteritem alqattara_masteritem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_masteritem
    ADD CONSTRAINT alqattara_masteritem_pkey PRIMARY KEY (id);


--
-- Name: alqattara_order alqattara_order_order_no_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_order
    ADD CONSTRAINT alqattara_order_order_no_key UNIQUE (order_no);


--
-- Name: alqattara_order alqattara_order_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_order
    ADD CONSTRAINT alqattara_order_pkey PRIMARY KEY (id);


--
-- Name: alqattara_orderitem alqattara_orderitem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_orderitem
    ADD CONSTRAINT alqattara_orderitem_pkey PRIMARY KEY (id);


--
-- Name: alqattara_product alqattara_product_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_product
    ADD CONSTRAINT alqattara_product_code_key UNIQUE (code);


--
-- Name: alqattara_product alqattara_product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_product
    ADD CONSTRAINT alqattara_product_pkey PRIMARY KEY (id);


--
-- Name: alqattara_route alqattara_route_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_route
    ADD CONSTRAINT alqattara_route_code_key UNIQUE (code);


--
-- Name: alqattara_route alqattara_route_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_route
    ADD CONSTRAINT alqattara_route_pkey PRIMARY KEY (id);


--
-- Name: alqattara_storeinventory alqattara_storeinventory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_storeinventory
    ADD CONSTRAINT alqattara_storeinventory_pkey PRIMARY KEY (id);


--
-- Name: alqattara_wallet alqattara_wallet_customer_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_wallet
    ADD CONSTRAINT alqattara_wallet_customer_id_key UNIQUE (customer_id);


--
-- Name: alqattara_wallet alqattara_wallet_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_wallet
    ADD CONSTRAINT alqattara_wallet_pkey PRIMARY KEY (id);


--
-- Name: alqattara_walletrecharge alqattara_walletrecharge_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_walletrecharge
    ADD CONSTRAINT alqattara_walletrecharge_pkey PRIMARY KEY (id);


--
-- Name: alqattara_zone alqattara_zone_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_zone
    ADD CONSTRAINT alqattara_zone_code_key UNIQUE (code);


--
-- Name: alqattara_zone alqattara_zone_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_zone
    ADD CONSTRAINT alqattara_zone_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: customers_customer customers_customer_customer_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers_customer
    ADD CONSTRAINT customers_customer_customer_code_key UNIQUE (customer_code);


--
-- Name: customers_customer customers_customer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers_customer
    ADD CONSTRAINT customers_customer_pkey PRIMARY KEY (id);


--
-- Name: customers_customerstatement customers_customerstatement_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers_customerstatement
    ADD CONSTRAINT customers_customerstatement_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: salesman_commissionreport salesman_commissionreport_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salesman_commissionreport
    ADD CONSTRAINT salesman_commissionreport_pkey PRIMARY KEY (id);


--
-- Name: salesman_salesman salesman_salesman_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salesman_salesman
    ADD CONSTRAINT salesman_salesman_pkey PRIMARY KEY (id);


--
-- Name: salesman_salesman salesman_salesman_salesman_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salesman_salesman
    ADD CONSTRAINT salesman_salesman_salesman_code_key UNIQUE (salesman_code);


--
-- Name: salesman_truck salesman_truck_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salesman_truck
    ADD CONSTRAINT salesman_truck_pkey PRIMARY KEY (id);


--
-- Name: salesman_truck salesman_truck_plate_no_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salesman_truck
    ADD CONSTRAINT salesman_truck_plate_no_key UNIQUE (plate_no);


--
-- Name: salesman_truckstocktransaction salesman_truckstocktransaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salesman_truckstocktransaction
    ADD CONSTRAINT salesman_truckstocktransaction_pkey PRIMARY KEY (id);


--
-- Name: alqattara_cashiertransaction_customer_id_0ff91496; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_cashiertransaction_customer_id_0ff91496 ON public.alqattara_cashiertransaction USING btree (customer_id);


--
-- Name: alqattara_cashiertransaction_salesman_id_c97c0b21; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_cashiertransaction_salesman_id_c97c0b21 ON public.alqattara_cashiertransaction USING btree (salesman_id);


--
-- Name: alqattara_cashiertransaction_transaction_no_b8498ad8_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_cashiertransaction_transaction_no_b8498ad8_like ON public.alqattara_cashiertransaction USING btree (transaction_no varchar_pattern_ops);


--
-- Name: alqattara_invoice_customer_id_a0e182e9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_invoice_customer_id_a0e182e9 ON public.alqattara_invoice USING btree (customer_id);


--
-- Name: alqattara_invoice_invoice_no_577d45ce_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_invoice_invoice_no_577d45ce_like ON public.alqattara_invoice USING btree (invoice_no varchar_pattern_ops);


--
-- Name: alqattara_invoice_order_id_2f7b4c41; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_invoice_order_id_2f7b4c41 ON public.alqattara_invoice USING btree (order_id);


--
-- Name: alqattara_order_customer_id_e93f8d4f; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_order_customer_id_e93f8d4f ON public.alqattara_order USING btree (customer_id);


--
-- Name: alqattara_order_order_no_2d3254a0_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_order_order_no_2d3254a0_like ON public.alqattara_order USING btree (order_no varchar_pattern_ops);


--
-- Name: alqattara_order_salesman_id_b36b2f7f; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_order_salesman_id_b36b2f7f ON public.alqattara_order USING btree (salesman_id);


--
-- Name: alqattara_orderitem_order_id_d5e1ec02; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_orderitem_order_id_d5e1ec02 ON public.alqattara_orderitem USING btree (order_id);


--
-- Name: alqattara_orderitem_product_id_20cf8992; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_orderitem_product_id_20cf8992 ON public.alqattara_orderitem USING btree (product_id);


--
-- Name: alqattara_product_code_cc86ed20_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_product_code_cc86ed20_like ON public.alqattara_product USING btree (code varchar_pattern_ops);


--
-- Name: alqattara_route_code_446f40ca_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_route_code_446f40ca_like ON public.alqattara_route USING btree (code varchar_pattern_ops);


--
-- Name: alqattara_route_driver_salesman_id_57805a10; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_route_driver_salesman_id_57805a10 ON public.alqattara_route USING btree (driver_salesman_id);


--
-- Name: alqattara_route_zone_id_417ddfb7; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_route_zone_id_417ddfb7 ON public.alqattara_route USING btree (zone_id);


--
-- Name: alqattara_storeinventory_product_id_2fd4b534; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_storeinventory_product_id_2fd4b534 ON public.alqattara_storeinventory USING btree (product_id);


--
-- Name: alqattara_walletrecharge_wallet_id_3ff72392; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_walletrecharge_wallet_id_3ff72392 ON public.alqattara_walletrecharge USING btree (wallet_id);


--
-- Name: alqattara_zone_code_f02ccd94_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alqattara_zone_code_f02ccd94_like ON public.alqattara_zone USING btree (code varchar_pattern_ops);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: customers_customer_customer_code_8e82a7cf_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX customers_customer_customer_code_8e82a7cf_like ON public.customers_customer USING btree (customer_code varchar_pattern_ops);


--
-- Name: customers_customerstatement_customer_id_311566ec; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX customers_customerstatement_customer_id_311566ec ON public.customers_customerstatement USING btree (customer_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: salesman_commissionreport_salesman_id_46039a68; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX salesman_commissionreport_salesman_id_46039a68 ON public.salesman_commissionreport USING btree (salesman_id);


--
-- Name: salesman_salesman_salesman_code_d920601a_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX salesman_salesman_salesman_code_d920601a_like ON public.salesman_salesman USING btree (salesman_code varchar_pattern_ops);


--
-- Name: salesman_truck_driver_salesman_id_2ce6e1e6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX salesman_truck_driver_salesman_id_2ce6e1e6 ON public.salesman_truck USING btree (driver_salesman_id);


--
-- Name: salesman_truck_plate_no_ec57f6b5_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX salesman_truck_plate_no_ec57f6b5_like ON public.salesman_truck USING btree (plate_no varchar_pattern_ops);


--
-- Name: salesman_truckstocktransaction_truck_id_33060ad2; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX salesman_truckstocktransaction_truck_id_33060ad2 ON public.salesman_truckstocktransaction USING btree (truck_id);


--
-- Name: alqattara_cashiertransaction alqattara_cashiertra_customer_id_0ff91496_fk_customers; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_cashiertransaction
    ADD CONSTRAINT alqattara_cashiertra_customer_id_0ff91496_fk_customers FOREIGN KEY (customer_id) REFERENCES public.customers_customer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_cashiertransaction alqattara_cashiertra_salesman_id_c97c0b21_fk_salesman_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_cashiertransaction
    ADD CONSTRAINT alqattara_cashiertra_salesman_id_c97c0b21_fk_salesman_ FOREIGN KEY (salesman_id) REFERENCES public.salesman_salesman(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_invoice alqattara_invoice_customer_id_a0e182e9_fk_customers_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_invoice
    ADD CONSTRAINT alqattara_invoice_customer_id_a0e182e9_fk_customers_customer_id FOREIGN KEY (customer_id) REFERENCES public.customers_customer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_invoice alqattara_invoice_order_id_2f7b4c41_fk_alqattara_order_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_invoice
    ADD CONSTRAINT alqattara_invoice_order_id_2f7b4c41_fk_alqattara_order_id FOREIGN KEY (order_id) REFERENCES public.alqattara_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_order alqattara_order_customer_id_e93f8d4f_fk_customers_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_order
    ADD CONSTRAINT alqattara_order_customer_id_e93f8d4f_fk_customers_customer_id FOREIGN KEY (customer_id) REFERENCES public.customers_customer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_order alqattara_order_salesman_id_b36b2f7f_fk_salesman_salesman_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_order
    ADD CONSTRAINT alqattara_order_salesman_id_b36b2f7f_fk_salesman_salesman_id FOREIGN KEY (salesman_id) REFERENCES public.salesman_salesman(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_orderitem alqattara_orderitem_order_id_d5e1ec02_fk_alqattara_order_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_orderitem
    ADD CONSTRAINT alqattara_orderitem_order_id_d5e1ec02_fk_alqattara_order_id FOREIGN KEY (order_id) REFERENCES public.alqattara_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_orderitem alqattara_orderitem_product_id_20cf8992_fk_alqattara_product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_orderitem
    ADD CONSTRAINT alqattara_orderitem_product_id_20cf8992_fk_alqattara_product_id FOREIGN KEY (product_id) REFERENCES public.alqattara_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_route alqattara_route_driver_salesman_id_57805a10_fk_salesman_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_route
    ADD CONSTRAINT alqattara_route_driver_salesman_id_57805a10_fk_salesman_ FOREIGN KEY (driver_salesman_id) REFERENCES public.salesman_salesman(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_route alqattara_route_zone_id_417ddfb7_fk_alqattara_zone_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_route
    ADD CONSTRAINT alqattara_route_zone_id_417ddfb7_fk_alqattara_zone_id FOREIGN KEY (zone_id) REFERENCES public.alqattara_zone(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_storeinventory alqattara_storeinven_product_id_2fd4b534_fk_alqattara; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_storeinventory
    ADD CONSTRAINT alqattara_storeinven_product_id_2fd4b534_fk_alqattara FOREIGN KEY (product_id) REFERENCES public.alqattara_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_wallet alqattara_wallet_customer_id_cf168d79_fk_customers_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_wallet
    ADD CONSTRAINT alqattara_wallet_customer_id_cf168d79_fk_customers_customer_id FOREIGN KEY (customer_id) REFERENCES public.customers_customer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: alqattara_walletrecharge alqattara_walletrech_wallet_id_3ff72392_fk_alqattara; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alqattara_walletrecharge
    ADD CONSTRAINT alqattara_walletrech_wallet_id_3ff72392_fk_alqattara FOREIGN KEY (wallet_id) REFERENCES public.alqattara_wallet(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: customers_customerstatement customers_customerst_customer_id_311566ec_fk_customers; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers_customerstatement
    ADD CONSTRAINT customers_customerst_customer_id_311566ec_fk_customers FOREIGN KEY (customer_id) REFERENCES public.customers_customer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: salesman_commissionreport salesman_commissionr_salesman_id_46039a68_fk_salesman_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salesman_commissionreport
    ADD CONSTRAINT salesman_commissionr_salesman_id_46039a68_fk_salesman_ FOREIGN KEY (salesman_id) REFERENCES public.salesman_salesman(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: salesman_truck salesman_truck_driver_salesman_id_2ce6e1e6_fk_salesman_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salesman_truck
    ADD CONSTRAINT salesman_truck_driver_salesman_id_2ce6e1e6_fk_salesman_ FOREIGN KEY (driver_salesman_id) REFERENCES public.salesman_salesman(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: salesman_truckstocktransaction salesman_truckstockt_truck_id_33060ad2_fk_salesman_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salesman_truckstocktransaction
    ADD CONSTRAINT salesman_truckstockt_truck_id_33060ad2_fk_salesman_ FOREIGN KEY (truck_id) REFERENCES public.salesman_truck(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

\unrestrict vWOpeuz8gitMI4cmhANmmbGSNf7IRxiOxnh0Mmtm6AnjNsZMl2UBKpj7KlTTHRk

