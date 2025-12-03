import { FeedBack } from 'src/model/users/feedback.model';
import { FeedbackCreateDto } from './dto/create.dto';
import { CheckService } from 'src/common/service/check.service';
import { CustomerPost } from 'src/model/customer/post.model';
import { GetDto } from './dto/get.dto';
import { acceptDto } from './dto/accept.dto';
import { ProjectService } from '../project/project.service';
import { PostService } from '../customer/post/post.service';
export declare class FeedbackService {
    private feedbackModel;
    private postModel;
    private check;
    private projectService;
    private postService;
    constructor(feedbackModel: typeof FeedBack, postModel: typeof CustomerPost, check: CheckService, projectService: ProjectService, postService: PostService);
    createFeedBack(dto: FeedbackCreateDto): Promise<{
        message: string;
    }>;
    getFeedbacks(dto: GetDto): Promise<FeedBack[]>;
    acceptFeedback(feedbackId: number, dto: acceptDto): Promise<{
        message: string;
    }>;
    rejectFeedback(feedbackId: number): Promise<void>;
    checkPost(postId: number): Promise<CustomerPost>;
    checkFeedback(postId: number, userId: number): Promise<void>;
}
