package com.chatbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "Conversation")
@ToString
public class Conversation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant1", referencedColumnName = "id")
    private User participant1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant2", referencedColumnName = "id")
    private User participant2;
}
