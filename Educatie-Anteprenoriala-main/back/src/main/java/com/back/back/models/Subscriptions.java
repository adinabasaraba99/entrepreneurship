package com.back.back.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@RequiredArgsConstructor
public class Subscriptions {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name="me_id")
    private AppUser me;

    @ManyToOne
    @JoinColumn(name="moderator_id")
    private AppUser moderator;

    public Subscriptions(AppUser me, AppUser moderator) {
        this.me = me;
        this.moderator = moderator;
    }
}
