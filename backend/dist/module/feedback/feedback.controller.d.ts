import { FeedbackService } from './feedback.service';
import { FeedbackCreateDto } from './dto/create.dto';
import { GetDto } from './dto/get.dto';
import { acceptDto } from './dto/accept.dto';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    postFeedBack(dto: FeedbackCreateDto): Promise<{
        message: string;
    }>;
    getFeedBack(dto: GetDto): Promise<import("../../model/users/feedback.model").FeedBack[]>;
    acceptFeedback(dto: acceptDto, feedbackId: number): Promise<{
        message: string;
    }>;
    rejectFeedback(feedbackId: number): Promise<void>;
}
