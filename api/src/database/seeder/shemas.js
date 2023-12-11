module.exports.creationTableQuery = `CREATE TABLE organisations (
        org_id TEXT PRIMARY KEY NOT NULL,
        roles TEXT NOT NULL,
        creation_date TEXT,
        is_active INT DEFAULT 1
    );

    CREATE TABLE cvfs (
        cvf_id TEXT PRIMARY KEY NOT NULL,
        date TEXT,
        cvf_file_path TEXT,
        is_sended INT DEFAULT 0
    );

    CREATE TABLE tasks (
        tsk_id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        date TEXT
    );

    CREATE TABLE rules (
        rls_id TEXT PRIMARY KEY NOT NULL,
        rule TEXT NOT NULL,
        creation_date TEXT
    );

    CREATE TABLE chats (
        cht_id TEXT PRIMARY KEY NOT NULL,
        creation_date TEXT NOT NULL
    );

    CREATE TABLE users (
        usr_id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        room TEXT NOT NULL,
        promotion TEXT NOT NULL,
        arrival_date TEXT,
        password TEXT NOT NULL,
        on_vacation INT DEFAULT 0,
        org_id TEXT,
        tsk_id TEXT,
        CONSTRAINT fk_org_id
        foreign key(org_id) references organisations(org_id)
        on delete cascade,
        CONSTRAINT fk_tsk_id
        foreign key(tsk_id) references tasks(tsk_id)
        on delete cascade
    );

    CREATE TABLE vacations (
        vct TEXT PRIMARY KEY NOT NULL,
        usr_id TEXT NOT NULL,
        departure_date TEXT,
        return_date TEXT,
        go_to TEXT,
        CONSTRAINT fk_usr_id
        foreign key(usr_id) references users(usr_id)
        on delete cascade
    );

    CREATE TABLE events (
        evn_id TEXT PRIMARY KEY NOT NULL,
        usr_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        CONSTRAINT fk_usr_id
        foreign key(usr_id) references users(usr_id)
        on delete cascade
    );

    CREATE TABLE userschat (
        cht_id TEXT NOT NULL,
        usr_id TEXT NOT NULL,
        CONSTRAINT fk_usr_id
        foreign key(usr_id) references users(usr_id)
        on delete cascade,
        CONSTRAINT fk_cht_id
        foreign key(cht_id) references chats(cht_id)
        on delete cascade
    );

    CREATE TABLE messages (
        msg_id TEXT PRIMARY KEY NOT NULL,
        cht_id TEXT NOT NULL,
        message TEXT NOT NULL,
        CONSTRAINT fk_cht_id
        foreign key(cht_id) references chats(cht_id)
        on delete cascade
    );
`;