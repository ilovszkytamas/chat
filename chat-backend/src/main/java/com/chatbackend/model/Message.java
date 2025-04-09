package com.chatbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "Message")
@ToString
public class Message {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private Long conversationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender", referencedColumnName = "id")
    private User sender;
}
