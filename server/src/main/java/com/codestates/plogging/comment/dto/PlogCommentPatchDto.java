package com. codestates.plogging.comment.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlogCommentPatchDto {
    private long plogCommentId;
    private String plogComment;
}
