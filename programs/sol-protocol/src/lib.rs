use anchor_lang::prelude::*;

declare_id!("7M5iD5J7hFHuk3UeP1ykrJK2VTK26Va638omgWbtUzMi");

#[error_code]
pub enum ErrorCode {
    #[msg("Already asserted")]
    AlreadyAsserted,
    // Add other variants if needed
}

#[program]
pub mod sol_protocol {
    use super::*;

    pub fn propose(
        ctx: Context<Proposal>,
        id: u64,
        proposal_name: String,
        reward_amount: u64,
    ) -> Result<()> {
        let proposal_account: &mut Account<'_, ProposalAccount> =
            &mut ctx.accounts.proposal_account;

        proposal_account.id = id;
        proposal_account.proposal_name = proposal_name;
        proposal_account.reward_amount = reward_amount;
        proposal_account.owner = *ctx.accounts.authority.key;
        proposal_account.assert_at = 0;

        Ok(())
    }

    pub fn assert(ctx: Context<Assert>, id: u64, answer: bool) -> Result<()> {
        let proposal_account: &mut Account<'_, ProposalAccount> =
            &mut ctx.accounts.proposal_account;
        if proposal_account.assert_at != 0 {
            return Err(ErrorCode::AlreadyAsserted.into());
        }
        let assertion_account = &mut ctx.accounts.assertion_account;
        assertion_account.id = id;
        assertion_account.owner = *ctx.accounts.authority.key;
        assertion_account.proposal_key = assertion_account.key();
        assertion_account.answer = answer;
        //TODO: add real money transfer
        assertion_account.assert_amount = proposal_account.reward_amount * 100;
        assertion_account.assert_at = Clock::get()?.unix_timestamp;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(id : u64)]
pub struct Proposal<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + 8 + 32+ (4 + 12)+ 8 + 1,
        seeds = [b"proposal", authority.key().as_ref(), id.to_le_bytes().as_ref()], 
        bump
    )]
    pub proposal_account: Account<'info, ProposalAccount>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id : u64, answer: bool)]
pub struct Assert<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"proposal", authority.key().as_ref(), id.to_le_bytes().as_ref()], 
        bump
    )]
    pub proposal_account: Account<'info, ProposalAccount>,

    #[account(
        init,
        payer = authority,
        space = 8 + 8 + 32+ (4 + 12)+ 32 + 1 + 8 + 8 + 1,
        seeds = [b"assert", authority.key().as_ref(), id.to_le_bytes().as_ref(), proposal_account.id.to_le_bytes().as_ref()], 
        bump
    )]
    pub assertion_account: Account<'info, AssertionAccount>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct ProposalAccount {
    pub id: u64,
    pub owner: Pubkey,
    pub proposal_name: String,
    pub reward_amount: u64,
    pub assert_at: i64,
}

#[account]
#[derive(Default)]
pub struct AssertionAccount {
    pub id: u64,
    pub proposal_key: Pubkey,
    pub owner: Pubkey,
    pub answer: bool,
    pub assert_amount: u64,
    pub assert_at: i64,
}
