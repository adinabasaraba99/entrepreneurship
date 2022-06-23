create table app_user (
                          id bigint not null auto_increment,
                          confirmed bit,
                          email varchar(255),
                          name varchar(255),
                          password varchar(255),
                          role varchar(255),
                          surname varchar(255),
                          primary key (id)
) engine=MyISAM;
 

create table confirmation_token (
                                    id bigint not null auto_increment,
                                    confirmed_at datetime,
                                    created_at datetime not null,
                                    expires_at datetime not null,
                                    token varchar(255) not null,
                                    app_user_id bigint not null,
                                    primary key (id)
) engine=MyISAM;
 

create table course (
                        id bigint not null auto_increment,
                        added_time datetime,
                        back_name varchar(250),
                        description varchar(255),
                        email varchar(255),
                        number_of_ratings integer not null,
                        rating float not null,
                        title varchar(255),
                        type varchar(255),
                        primary key (id)
) engine=MyISAM;
 

create table ratings (
                         id bigint not null auto_increment,
                         rating float not null,
                         course_id bigint,
                         user_id bigint,
                         primary key (id)
) engine=MyISAM;
 

create table subscriptions (
                               id bigint not null auto_increment,
                               me_id bigint,
                               moderator_id bigint,
                               primary key (id)
) engine=MyISAM;
 

alter table course
    add constraint UK_6t0p6p9iko2b9w1ykno14lj2v unique (back_name);
     

alter table confirmation_token
    add constraint FKo9fl25wqyh7w7mnfkdqen1rcm
        foreign key (app_user_id)
            references app_user (id);
     

alter table ratings
    add constraint FK1o1o9snvemeffyn7cae0kiuts
        foreign key (course_id)
            references course (id);
     

alter table ratings
    add constraint FK9ew5wrlbw8skluuaa432ciwij
        foreign key (user_id)
            references app_user (id);
     

alter table subscriptions
    add constraint FKhmdpct6qyleg45j5aaatpbhid
        foreign key (me_id)
            references app_user (id);
     

alter table subscriptions
    add constraint FK705nnbnf2s5hg9dcuv0ahltji
        foreign key (moderator_id)
            references app_user (id);